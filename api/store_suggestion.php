<?php
require 'secret.php';
require 'db.php';

if (!isset($_GET['text']) || !isset($_GET['destination']) || !isset($_GET['timestamp'])) {
    header("HTTP/1.1 400 Bad Request");
    exit;
}

$db_conn = connect_to_db_or_die();

$text = $db_conn->real_escape_string($_GET['text']);
$destination = $db_conn->real_escape_string($_GET['destination']);
$timestamp = $db_conn->real_escape_string($_GET['timestamp']);

$statement = "INSERT INTO suggestions(text, destination, timestamp) " .
             "VALUES ($text, $destination, $timestamp)";
$db_conn->query($statement);
$db_conn->close();
?>