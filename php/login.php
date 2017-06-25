<?php 
require_once('./base.php');
session_start(); 

$code = $_GET['code'];
$wxUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='.$config['AppID'].'&secret='.$config['AppSecret'].'&js_code='.$code.'&grant_type=authorization_code';

$res = doCurlGetRequest($wxUrl);
if($res){
    $data = object2array(json_decode($res));
    if(isset($data['session_key']) && $data['session_key']){
        $token = md5($data['session_key'].$data['openid']);//生成3rd_session
        $_SESSION[$token] = $data['session_key'].$data['openid'];
        apiReturn($token);
    }else{
        apiReturn();
    }
  
    
}else{
    apiReturn();
}


