<?php
require 'secret.php';

function connect_to_db_or_die() {
    global $db_server, $db_username, $db_password, $db_name, $db_port;

    // All database credentials are defined in secret.php
    $db_conn = new mysqli($db_server, $db_username, $db_password, $db_name, $db_port);

    // Support 4-bytes-long UTF8 characters, including emojis
    $db_conn->set_charset('utf8mb4');

    // Check connection
    if (mysqli_connect_error()) {
        header('HTTP/1.1 503 Unavailable');
        exit('Database is unavailable');
    }

    return $db_conn;
}
?>
