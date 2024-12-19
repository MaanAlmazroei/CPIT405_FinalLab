<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../db/Database.php';

$database = new Database();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"));

error_log("Received Input: " . print_r($data, true));

if (!empty($data->title) && !empty($data->url)) {
    try {
        $query = "INSERT INTO bookmark (title, URL, dateAdded) VALUES (:title, :url, NOW())";
        $stmt = $db->prepare($query);

        $stmt->bindParam(':title', $data->title);
        $stmt->bindParam(':url', $data->url);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Bookmark created successfully."]);
        } else {
            echo json_encode(["message" => "Failed to create bookmark."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Database error occurred.", "error" => $e->getMessage()]);
        error_log("Database Error: " . $e->getMessage());
    }
} else {
    echo json_encode(["message" => "Error: Missing required parameters URL and/or title in the JSON body."]);
    error_log("Missing Parameters: Title or URL not provided.");
}
?>
