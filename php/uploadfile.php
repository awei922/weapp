<?php 
require_once('./base.php');

$file = $_FILES['file'];

if($file['error']){
    apiReturn();        
}else{
    move_uploaded_file($file['tmp_name'],'./'.$file['name']);
    apiReturn('http://'.$_SERVER['HTTP_HOST'].'/weapp/'.$file['name']);
}