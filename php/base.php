<?php
$config = [
	'AppID'=>'wxe70af8ae4f1e284d',
	'AppSecret'=>'f2155bab574c930bd13ec29af2065fd8'
];

/**
 *@desc 封闭curl的调用接口，get的请求方式。
 */
function doCurlGetRequest($url, $data=[], $timeout = 5) {
	if ($url == "" || $timeout <= 0) {
		return false;
	}
	!empty($data) && $url = $url . '?' . http_bulid_query($data);
	$ch = curl_init((string)$url);
	
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不验证证书
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //不验证证书
	curl_setopt($ch, CURLOPT_TIMEOUT, (int)$timeout);
	$res = curl_exec($ch);
	curl_close($ch);

	return $res;
}
/**
 ** @desc 封装 curl 的调用接口，post的请求方式
 *
 */
function doCurlPostRequest($url, $requestString, $timeout = 5) {
	if ($url == '' || $requestString == '' || $timeout <= 0) {
		return false;
	}
	$ch = curl_init((string)$url);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $requestString);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不验证证书
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //不验证证书
	curl_setopt($ch, CURLOPT_TIMEOUT, (int)$timeout);
	$res = curl_exec($ch);
	curl_close($ch);

	return $res;
}

/**
 * 数组转对象
 */
function array2object($array) {
  if (is_array($array)) {
    $obj = new StdClass();
    foreach ($array as $key => $val){
      $obj->$key = $val;
    }
  }
  else { $obj = $array; }
  return $obj;
}
/**
 * 对象转数组
 */
function object2array($object) {
  if (is_object($object)) {
    foreach ($object as $key => $value) {
      $array[$key] = $value;
    }
  }
  else {
    $array = $object;
  }
  return $array;
}

/**
 * api返回
 */
function apiReturn($data=''){
	if($data){
		exit(json_encode(['status'=>1,'msg'=>'请求成功','data'=>$data]));
	}else{
		exit(json_encode(['status'=>0,'msg'=>'请求失败','data'=>$data]));
	}
}
