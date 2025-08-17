<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'download':
                    downloadBackup();
                    break;
                case 'list':
                    listBackups();
                    break;
                default:
                    createBackup();
                    break;
            }
        } else {
            createBackup();
        }
        break;
    case 'POST':
        if (isset($_POST['action']) && $_POST['action'] === 'restore') {
            restoreBackup();
        } else {
            createBackup();
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function createBackup() {
    global $db;
    
    try {
        $timestamp = date('Y-m-d_H-i-s');
        $filename = "somiti_backup_{$timestamp}.sql";
        $backup_path = "../backups/" . $filename;
        
        // Create backups directory if it doesn't exist
        if (!file_exists('../backups')) {
            mkdir('../backups', 0755, true);
        }
        
        // Get database connection details
        $config = require '../config/database.php';
        
        // Create mysqldump command
        $host = 'localhost';
        $dbname = 'somiti_manager';
        $username = 'your_db_user';
        $password = 'your_db_pass';
        
        $command = "mysqldump --host={$host} --user={$username} --password={$password} {$dbname} > {$backup_path}";
        
        // Alternative PHP-based backup for shared hosting
        $backup_content = generateSQLBackup();
        file_put_contents($backup_path, $backup_content);
        
        $file_size = filesize($backup_path);
        
        // Log backup
        $logQuery = "INSERT INTO backup_logs (backup_type, backup_size, backup_path, status, organization_id) VALUES (?, ?, ?, ?, ?)";
        $logStmt = $db->prepare($logQuery);
        $logStmt->execute(['manual', $file_size, $filename, 'success', 1]);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Backup created successfully",
            "filename" => $filename,
            "size" => formatBytes($file_size),
            "download_url" => "backup.php?action=download&file=" . $filename
        ]);
        
    } catch (Exception $e) {
        // Log failed backup
        $logQuery = "INSERT INTO backup_logs (backup_type, backup_size, backup_path, status, organization_id) VALUES (?, ?, ?, ?, ?)";
        $logStmt = $db->prepare($logQuery);
        $logStmt->execute(['manual', 0, '', 'failed', 1]);
        
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Backup failed: " . $e->getMessage()
        ]);
    }
}

function generateSQLBackup() {
    global $db;
    
    $backup = "-- সমিতি ম্যানেজার Database Backup\n";
    $backup .= "-- Created: " . date('Y-m-d H:i:s') . "\n\n";
    $backup .= "SET FOREIGN_KEY_CHECKS=0;\n\n";
    
    $tables = ['organizations', 'users', 'members', 'collections', 'loans', 'savings'];
    
    foreach ($tables as $table) {
        // Get table structure
        $createStmt = $db->query("SHOW CREATE TABLE {$table}");
        $createResult = $createStmt->fetch(PDO::FETCH_ASSOC);
        
        $backup .= "-- Table structure for {$table}\n";
        $backup .= "DROP TABLE IF EXISTS `{$table}`;\n";
        $backup .= $createResult['Create Table'] . ";\n\n";
        
        // Get table data
        $dataStmt = $db->query("SELECT * FROM {$table}");
        $backup .= "-- Data for table {$table}\n";
        
        while ($row = $dataStmt->fetch(PDO::FETCH_ASSOC)) {
            $columns = array_keys($row);
            $values = array_map(function($value) {
                return is_null($value) ? 'NULL' : "'" . addslashes($value) . "'";
            }, array_values($row));
            
            $backup .= "INSERT INTO `{$table}` (`" . implode('`, `', $columns) . "`) VALUES (" . implode(', ', $values) . ");\n";
        }
        $backup .= "\n";
    }
    
    $backup .= "SET FOREIGN_KEY_CHECKS=1;\n";
    return $backup;
}

function downloadBackup() {
    $filename = $_GET['file'] ?? '';
    $filepath = "../backups/" . $filename;
    
    if (!file_exists($filepath)) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Backup file not found"
        ]);
        return;
    }
    
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($filepath));
    readfile($filepath);
    exit;
}

function listBackups() {
    global $db;
    
    try {
        $query = "SELECT * FROM backup_logs ORDER BY created_at DESC LIMIT 50";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $backups = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['formatted_size'] = formatBytes($row['backup_size']);
            $row['file_exists'] = file_exists("../backups/" . $row['backup_path']);
            $backups[] = $row;
        }
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $backups
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error listing backups: " . $e->getMessage()
        ]);
    }
}

function restoreBackup() {
    global $db;
    
    if (!isset($_FILES['backup_file'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "No backup file uploaded"
        ]);
        return;
    }
    
    try {
        $uploadedFile = $_FILES['backup_file']['tmp_name'];
        $sql = file_get_contents($uploadedFile);
        
        // Execute SQL commands
        $db->exec($sql);
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Database restored successfully"
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Restore failed: " . $e->getMessage()
        ]);
    }
}

function formatBytes($size, $precision = 2) {
    $base = log($size, 1024);
    $suffixes = array('B', 'KB', 'MB', 'GB', 'TB');
    return round(pow(1024, $base - floor($base)), $precision) . ' ' . $suffixes[floor($base)];
}

// Auto backup function (call this via cron job)
function autoBackup() {
    // Create daily backup
    createBackup();
    
    // Clean old backups (keep last 30 days)
    $oldBackups = glob("../backups/somiti_backup_*.sql");
    foreach ($oldBackups as $file) {
        if (filemtime($file) < strtotime('-30 days')) {
            unlink($file);
        }
    }
}

// If called via cron
if (isset($_GET['cron']) && $_GET['cron'] === 'auto') {
    autoBackup();
}
?>
