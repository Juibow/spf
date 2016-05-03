<?php
require("PHPMailer/class.phpmailer.php"); 
require("PHPMailer/class.smtp.php");
$mail=new PHPMailer();
// 设置PHPMailer使用SMTP服务器发送Email
$mail->IsSMTP();
// 设置邮件的字符编码，若不指定，则为'UTF-8'
$mail->CharSet='UTF-8';
// 添加收件人地址，可以多次使用来添加多个收件人
$mail->AddAddress('785054782@qq.com');
// 设置邮件正文
$message='这是一封测试邮件';
$mail->Body=$message;
// 设置邮件头的From字段。
// 对于网易的SMTP服务，这部分必须和你的实际账号相同，否则会验证出错。
$mail->From='spfpms@gmail.com';
// 设置发件人名字
$mail->FromName='do-not-reply';
// 设置邮件标题
$mail->Subject='邮件测试';
// 设置SMTP服务器。这里使用网易的SMTP服务器。
$mail->Host='smtp.gmail.com';
// 设置为“需要验证”
$mail->SMTPAuth=true;
// 设置用户名和密码，即网易邮件的用户名和密码。
$mail->Username='spfpms@gmail.com';
$mail->Password='pms2016sp';
// 发送邮件。
$mail->Send();
?>