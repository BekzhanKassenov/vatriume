<?php

require 'auth.php';

if (!isset($_POST['username']) || !isset($_POST['password'])) {
    header("HTTP/1.1 400 Bad Request");
    exit;
}

$requested_username = $_POST['username'];
$requested_password = $_POST['password'];

if (authenticate_user($requested_username, $requested_password)) {
    // authenticate_user will set the session data
    header("HTTP/1.1 200 OK");
} else {
    header("HTTP/1.1 401 Unauthorized");
}
?>