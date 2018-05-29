<?php

require 'auth.php';

if (!is_user_authenticated()) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

require 'secret.php';

if (!isset(_GET['key']) || !isset(_GET['delete_all'])) {
    header("HTTP/1.1 400 Bad Request");
    exit;
}

// All database credentials are defined in secret.php
$db_conn = new mysqli($db_server, $db_username, $db_password);

// Check connection
if ($db_conn->connect_error) {
    die('Database is unavailable');
}

$statement = null;
if (isset(_GET['delete_all'])) {
    $statement = "TRUNCATE suggestions";
} else {
    $key = $db_conn->real_escape_string(_GET['key']);
    $statement = "DELETE FROM suggestions WHERE key='$key'";
}

if ($db_conn->query($statement) !== TRUE) {
    header("HTTP/1.1 500 Internal Error");
} else {
    header("HTTP/1.1 200 OK");
}

$db_conn->close();
exit;
?>