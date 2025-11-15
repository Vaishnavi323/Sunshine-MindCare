<?php
defined('BASEPATH') OR exit('No direct script access allowed');


function encrypt_password($plainPassword)
{
    return password_hash($plainPassword, PASSWORD_BCRYPT);
}


function verify_password($plainPassword, $hashedPassword)
{
    return password_verify($plainPassword, $hashedPassword);
}
