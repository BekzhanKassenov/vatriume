<?php

require 'auth.php';

$requested_username = $_POST['username'];
$requested_password = $_POST['password'];

if (authenticate_user($requested_username, $requested_password)) {
    // authenticate_user will set the cookies
    header("HTTP/1.1 200 OK");
} else {
    header("HTTP/1.1 401 Unauthorized");
}
exit;
?>