<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['member_id'])) {
            getMemberCollections();
        } elseif (isset($_GET['date'])) {
            getDailyCollections();
        } else {
            getAllCollections();
        }
        break;
    case 'POST':
        addCollection();
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function getAllCollections() {
    global $db;
    
    try {
        $query = "SELECT c.*, m.member_name 
                  FROM collections c 
                  JOIN members m ON c.member_id = m.member_id 
                  ORDER BY c.collection_date DESC, c.created_at DESC 
                  LIMIT 100";
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $collections = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $collections[] = $row;
        }
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $collections,
            "count" => count($collections)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error fetching collections: " . $e->getMessage()
        ]);
    }
}

function getDailyCollections() {
    global $db;
    
    $date = $_GET['date'];
    
    try {
        $query = "SELECT c.*, m.member_name 
                  FROM collections c 
                  JOIN members m ON c.member_id = m.member_id 
                  WHERE c.collection_date = ? 
                  ORDER BY c.created_at DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute([$date]);
        
        $collections = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $collections[] = $row;
        }
        
        // Get daily summary
        $summaryQuery = "SELECT 
                         COUNT(*) as total_collections,
                         SUM(loan_collection) as total_loan_collection,
                         SUM(savings_collection) as total_savings_collection,
                         SUM(total_collection) as total_amount
                         FROM collections 
                         WHERE collection_date = ?";
        
        $summaryStmt = $db->prepare($summaryQuery);
        $summaryStmt->execute([$date]);
        $summary = $summaryStmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $collections,
            "summary" => $summary,
            "date" => $date
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error fetching daily collections: " . $e->getMessage()
        ]);
    }
}

function getMemberCollections() {
    global $db;
    
    $member_id = $_GET['member_id'];
    $month = $_GET['month'] ?? date('Y-m');
    
    try {
        $query = "SELECT c.*, m.member_name 
                  FROM collections c 
                  JOIN members m ON c.member_id = m.member_id 
                  WHERE c.member_id = ? AND DATE_FORMAT(c.collection_date, '%Y-%m') = ?
                  ORDER BY c.collection_date DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute([$member_id, $month]);
        
        $collections = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $collections[] = $row;
        }
        
        // Get monthly summary for member
        $summaryQuery = "SELECT 
                         COUNT(*) as total_days,
                         SUM(loan_collection) as total_loan_collection,
                         SUM(savings_collection) as total_savings_collection,
                         SUM(total_collection) as total_amount
                         FROM collections 
                         WHERE member_id = ? AND DATE_FORMAT(collection_date, '%Y-%m') = ?";
        
        $summaryStmt = $db->prepare($summaryQuery);
        $summaryStmt->execute([$member_id, $month]);
        $summary = $summaryStmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $collections,
            "summary" => $summary,
            "member_id" => $member_id,
            "month" => $month
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error fetching member collections: " . $e->getMessage()
        ]);
    }
}

function addCollection() {
    global $db;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (empty($input['member_id']) || empty($input['collection_date'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Member ID and collection date are required"
        ]);
        return;
    }
    
    try {
        // Check if collection already exists for this member and date
        $checkQuery = "SELECT id FROM collections WHERE member_id = ? AND collection_date = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$input['member_id'], $input['collection_date']]);
        
        if ($checkStmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Collection already exists for this member and date"
            ]);
            return;
        }
        
        $loan_collection = $input['loan_collection'] ?? 0;
        $savings_collection = $input['savings_collection'] ?? 0;
        $total_collection = $loan_collection + $savings_collection;
        
        $query = "INSERT INTO collections (member_id, collection_date, loan_collection, savings_collection, total_collection, worker_name, notes, organization_id) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            $input['member_id'],
            $input['collection_date'],
            $loan_collection,
            $savings_collection,
            $total_collection,
            $input['worker_name'] ?? '',
            $input['notes'] ?? '',
            1 // Default organization_id
        ]);
        
        // Update member's savings amount
        if ($savings_collection > 0) {
            $updateQuery = "UPDATE members SET savings_amount = savings_amount + ? WHERE member_id = ?";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->execute([$savings_collection, $input['member_id']]);
        }
        
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Collection added successfully",
            "total_collection" => $total_collection
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error adding collection: " . $e->getMessage()
        ]);
    }
}
?>
