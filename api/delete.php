<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Invalid input. ID is required.']);
    return;
}

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);
$bookmark->setId($data['id']);

if ($bookmark->delete()) {
    echo json_encode(['message' => 'Bookmark deleted successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to delete bookmark.']);
}
?>