<?php
header("Access-Control-Allow-Origin:* ");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myinfo";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) 
{
    die("连接失败: " . $conn->connect_error);
} 
mysqli_query($conn,"set names utf8");
$q=$_GET["q"];
if((string)$q=="choice")
{
	$sql = "SELECT i,que,c1,c2,c3,ans FROM ".(string)$q;
}
else if((string)$q=="fill")
{
	$sql = "SELECT id,que,ans FROM ".(string)$q;
}
$result = mysqli_query($conn,$sql);
if(!$result)
{
	die('无法读取数据：'.mysqli_error($conn));
}
if((string)$q=="choice")
{
	while($row = mysqli_fetch_array($result,MYSQLI_NUM)) 
	{
		echo "第" .$row[0]. "题@@" . $row[1]. "@@" . $row[2]. "@@". $row[3]. "@@".$row[4]. "@@".$row[5]."!!!!";
	}
}
else if((string)$q=="fill")
{
	while($row = mysqli_fetch_array($result,MYSQLI_NUM)) 
	{
		echo "第" .$row[0]. "题@@" . $row[1]. "@@" . $row[2]."!!!!";
	}
}
$conn->close();
?>