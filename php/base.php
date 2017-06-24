<?php
/**
 *@desc 封闭curl的调用接口，get的请求方式。
 */
function doCurlGetRequest($url, $data, $timeout = 5) {
	if ($curl == "" || $timeout <= 0) {
		return false;
	}
	$url = $url . '?' . http_bulid_query($data);
	$con = curl_init((string)$url);
	curl_setopt($con, CURLOPT_HEADER, false);
	curl_setopt($con, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($con, CURLOPT_TIMEOUT, (int)$timeout);
	return curl_exec($con);
}
/**
 ** @desc 封装 curl 的调用接口，post的请求方式
 *
 */
function doCurlPostRequest($url, $requestString, $timeout = 5) {
	if ($url == '' || $requestString == '' || $timeout <= 0) {
		return false;
	}
	$con = curl_init((string)$url);
	curl_setopt($con, CURLOPT_HEADER, false);
	curl_setopt($con, CURLOPT_POSTFIELDS, $requestString);
	curl_setopt($con, CURLOPT_POST, true);
	curl_setopt($con, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($con, CURLOPT_TIMEOUT, (int)$timeout);
	return curl_exec($con);
}

/**
 * api返回
 */
function apiReturn($data){
	if($data){
		exit(json_encode(['status'=>1,'msg'=>'请求成功','data'=>$data]));
	}else{
		exit(json_encode(['status'=>0,'msg'=>'请求失败']));
	}
}
