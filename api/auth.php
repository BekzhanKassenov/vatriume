<?php

require 'secret.php';

function check_user_exists($username, $password) {
    // $admin_credentials is defined in secret.php
    if (!array_key_exists($username, $admin_credentials)) {
        return false;
    }
    if ($admin_credentials[$username] !== $password) {
        return false;
    }
    return true;
}

$USERNAME_COOKIE_KEY = "username";
$AUTH_TOKEN_COOKIE_KEY = "auth_token";

function create_auth_token($username, $password) {
    return hash("sha256", $username + $password);
}

function authenticate_user($username, $password) {
    if (check_user_exists($username, $password)) {
        // cookie expiration moment, in seconds
        $cookie_lifetime = time() + 7200;
        setcookie($USERNAME_COOKIE_KEY, $requested_username, $cookie_lifetime);
        setcookie($AUTH_TOKEN_COOKIE_KEY, create_auth_token($username, $password), $cookie_lifetime);
    }
}

function is_user_authenticated() {
    if (!isset($_COOKIE[$USERNAME_COOKIE_KEY])) {
        return false;
    }
    $username = $_COOKIE[$USERNAME_COOKIE_KEY];

    if (!isset($_COOKIE[$AUTH_TOKEN_COOKIE_KEY])) {
        return false;
    }
    $auth_token = $_COOKIE[$AUTH_TOKEN_COOKIE_KEY];

    if (!array_key_exists($username, $admin_credentials)) {
        return false;
    }

    $password = $admin_credentials[$username];

    return create_auth_token($username, $password) === $auth_token;
}

?>