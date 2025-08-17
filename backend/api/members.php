<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getMembers();
        break;
    case 'POST':
        addMember();
        break;
    case 'PUT':
        updateMember();
        break;
    case 'DELETE':
        deleteMember();
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function getMembers() {
    global $db;
    
    try {
        $query = "SELECT * FROM members WHERE status = 'active' ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $members = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $members[] = $row;
        }
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $members,
            "count" => count($members)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error fetching members: " . $e->getMessage()
        ]);
    }
}

function addMember() {
    global $db;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (empty($input['member_name']) || empty($input['nid_number']) || empty($input['mobile_number']) || empty($input['worker_name'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Required fields are missing"
        ]);
        return;
    }
    
    try {
        // Generate member ID
        $year = date('Y');
        $stmt = $db->prepare("SELECT COUNT(*) as count FROM members WHERE member_id LIKE ?");
        $stmt->execute(["SM{$year}%"]);
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'] + 1;
        $member_id = "SM{$year}" . str_pad($count, 4, '0', STR_PAD_LEFT);
        
        $query = "INSERT INTO members (member_id, member_name, nid_number, mobile_number, worker_name, loan_amount, savings_amount, daily_installment, daily_savings, organization_id) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            $member_id,
            $input['member_name'],
            $input['nid_number'],
            $input['mobile_number'],
            $input['worker_name'],
            $input['loan_amount'] ?? 0,
            $input['savings_amount'] ?? 0,
            $input['daily_installment'] ?? 0,
            $input['daily_savings'] ?? 0,
            1 // Default organization_id
        ]);
        
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Member added successfully",
            "member_id" => $member_id
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error adding member: " . $e->getMessage()
        ]);
    }
}

function updateMember() {
    global $db;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['member_id'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Member ID is required"
        ]);
        return;
    }
    
    try {
        $query = "UPDATE members SET 
                  member_name = ?, 
                  mobile_number = ?, 
                  worker_name = ?, 
                  loan_amount = ?, 
                  savings_amount = ?, 
                  daily_installment = ?, 
                  daily_savings = ?,
                  updated_at = CURRENT_TIMESTAMP
                  WHERE member_id = ?";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            $input['member_name'],
            $input['mobile_number'],
            $input['worker_name'],
            $input['loan_amount'],
            $input['savings_amount'],
            $input['daily_installment'],
            $input['daily_savings'],
            $input['member_id']
        ]);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Member updated successfully"
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error updating member: " . $e->getMessage()
        ]);
    }
}

function deleteMember() {
    global $db;
    
    $member_id = $_GET['member_id'] ?? '';
    
    if (empty($member_id)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Member ID is required"
        ]);
        return;
    }
    
    try {
        // Soft delete
        $query = "UPDATE members SET status = 'inactive' WHERE member_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$member_id]);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Member deleted successfully"
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error deleting member: " . $e->getMessage()
        ]);
    }
}
?>
