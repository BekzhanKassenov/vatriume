<?php

require 'auth.php';

if (!is_user_authenticated()) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

require 'secret.php';

// All database credentials are defined in secret.php
$db_conn = new mysqli($db_server, $db_username, $db_password);

// Check connection
if ($db_conn->connect_error) {
    die('Database is unavailable');
}

$statement = "SELECT * FROM suggestions";
$rows = $db_conn->query($statement);

$response = [];
while ($row = $rows->fetch_assoc()) {
    array_push($response, [
        'key' => $row['key'],
        'text' => $row['text'],
        'timestamp' => $row['timestamp'],
        'destination' => $row['destination']
    ]);
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(response);
?>