<?php
require 'secret.php';

function connect_to_db_or_die() {
    // All database credentials are defined in secret.php
    $db_conn = new mysqli($db_server, $db_username, $db_password);

    // Check connection
    if ($db_conn->connect_error) {
        die('Database is unavailable');
    }

    return $db_conn;
}
?>