<?php 
session_start();
unset($_SESSION['user_camel']);
header('Location: ./');