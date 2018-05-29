<?php
require 'secret.php';

if (!isset($_GET['text']) || !isset($_GET['destination']) || !isset($_GET['timestamp'])) {
    header("HTTP/1.1 400 Bad Request");
    exit;
}

// All database credentials are defined in secret.php
$db_conn = new mysqli($db_server, $db_username, $db_password);

// Check connection
if ($db_conn->connect_error) {
    die('Database is unavailable');
}

$text = $db_conn->real_escape_string($_GET['text']);
$destination = $db_conn->real_escape_string($_GET['destination']);
$timestamp = $db_conn->real_escape_string($_GET['timestamp']);

$statement = "INSERT INTO suggestions(text, destination, timestamp) " +
             "VALUES ($text, $destination, $timestamp)";
$db_conn->query($statement);
$db_conn->close();
?>