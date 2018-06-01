<?php

require 'auth.php';
require 'db.php';

if (!is_user_authenticated()) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

$db_conn = connect_to_db_or_die();

$statement = "SELECT * FROM suggestions LIMIT 10000";
$rows = $db_conn->query($statement);

$response = [];
while ($row = $rows->fetch_assoc()) {
    array_push($response, [
        'id' => $row['id'],
        'text' => $row['text'],
        'timestamp' => $row['timestamp'],
        'destination' => $row['destination']
    ]);
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(response);

$db_conn->close();
?>