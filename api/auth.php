<?php

require 'secret.php';

function check_user_exists($username, $password) {
    global $admin_credentials;
    // $admin_credentials is defined in secret.php
    if (!array_key_exists($username, $admin_credentials)) {
        return false;
    }
    if ($admin_credentials[$username] !== $password) {
        return false;
    }
    return true;
}

$USERNAME_COOKIE_KEY = "va_username";
$AUTH_TOKEN_COOKIE_KEY = "va_auth_token";

function create_auth_token($username, $password) {
    return hash("sha256", $username + $password);
}

function authenticate_user($username, $password) {
    global $USERNAME_COOKIE_KEY;
    global $AUTH_TOKEN_COOKIE_KEY;

    if (check_user_exists($username, $password)) {
        $expiration_time = time() + 72000;
        setcookie($USERNAME_COOKIE_KEY, $username, $expiration_time, '/');
        setcookie($AUTH_TOKEN_COOKIE_KEY, create_auth_token($username, $password), $expiration_time, '/');
        return true;
    }
    return false;
}

function is_user_authenticated() {
    global $USERNAME_COOKIE_KEY;
    global $AUTH_TOKEN_COOKIE_KEY;

    if (!isset($_COOKIE[$USERNAME_COOKIE_KEY])) {
        return false;
    }
    $username = $_COOKIE[$USERNAME_COOKIE_KEY];

    if (!isset($_COOKIE[$AUTH_TOKEN_COOKIE_KEY])) {
        return false;
    }
    $auth_token = $_COOKIE[$AUTH_TOKEN_COOKIE_KEY];

    global $admin_credentials;

    if (!array_key_exists($username, $admin_credentials)) {
        return false;
    }

    $password = $admin_credentials[$username];

    return create_auth_token($username, $password) === $auth_token;
}

?>