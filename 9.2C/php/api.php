<?php
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

include 'settings.php';

header('Content-Type: application/json'); // Ensure all responses are JSON

$conn = new mysqli($host, $user, $pwd, $sql_db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action'])) {
    $action = $_GET['action'];
    $input = json_decode(file_get_contents("php://input"), true);

    if ($action === 'login') {
        $username = $conn->real_escape_string($input['username']);
        $password = $conn->real_escape_string($input['password']);

        $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            echo json_encode(["success" => true, "message" => "Login successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid username or password"]);
        }
    } elseif ($action === 'getUnits') {
        $query = "SELECT * FROM subjects";
        $result = $conn->query($query);
        $units = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $units[] = $row;
            }
        }
        echo json_encode($units);
    } elseif ($action === 'addUnit') {
        $code = $conn->real_escape_string($input['code']);
        $desc = $conn->real_escape_string($input['desc']);
        $cp = (float)$input['cp'];
        $type = $conn->real_escape_string($input['type']);

        $query = "INSERT INTO subjects (code, description, credit_points, type) VALUES ('$code', '$desc', $cp, '$type')";
        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Unit added successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding unit"]);
        }
    } elseif ($action === 'deleteUnit') {
        $code = $conn->real_escape_string($input['code']);

        $query = "DELETE FROM subjects WHERE code = '$code'";
        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Unit deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting unit"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid action"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>
