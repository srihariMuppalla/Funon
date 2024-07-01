<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection code below
$servername = "https://127.0.0.1:3306"; // Your database server
$username = "u887457219_funon"; // Your database username
$password = "Srihari@64"; // Your database password
$dbname = "u887457219_Srihari"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$dob = $_POST['dob'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, phone, dob, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $firstname, $lastname, $email, $phone, $dob, $password);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
