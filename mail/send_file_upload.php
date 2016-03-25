<?php
/**
 * PHPMailer simple file upload and send example
 */
$msg = '';
if (array_key_exists('userfile', $_FILES)) {
    // First handle the upload
    // Don't trust provided filename - same goes for MIME types
    // See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name']));
    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
        // Upload handled successfully
        // Now create a message
        // This should be somewhere in your include_path
        require 'PHPMailerAutoload.php';
        //Create a new PHPMailer instance
        $mail = new PHPMailer;
        //Tell PHPMailer to use SMTP
        $mail->isSMTP();
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 2;
        //Ask for HTML-friendly debug output
        $mail->Debugoutput = 'html';
        //Set the hostname of the mail server
        $mail->Host = "smtp.gmail.com";
        //Set the SMTP port number - likely to be 25, 465 or 587
        $mail->Port = 587;
        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        //Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'tls';
        //Username to use for SMTP authentication - use full email address for gmail
        $mail->Username = "spfpms@gmail.com";
        //Password to use for SMTP authentication
        $mail->Password = "pms2016sp";
        //Set who the message is to be sent from
        $mail->setFrom('spfpms@gmail.com', 'SPF-Project Management System');
        //Set an alternative reply-to address
        $mail->addReplyTo('replyto@example.com', 'First Last');
        //Set who the message is to be sent to
        //This is where we need to change, change the email address and user name to that of the SPF praticitants
        $mail->addAddress('tinarun007@gmail.com', 'Xiaoting Fu');
        $mail->addAddress('fux@kean.edu', 'Xiaoting Fu');
        $mail->addAddress('fuxiaoting663@wku.edu.cn', 'Xiaoting Fu');
        //Set the subject line
        $mail->Subject = '[DO-NOT-REPLY] SPF-Project Management System Service';

        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        $mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
        //Replace the plain text body with one created manually
        $mail->AltBody = 'This is a plain-text message body';

        // Attach the uploaded file
        $mail->addAttachment($uploadfile, 'My uploaded file');
        if (!$mail->send()) {
            $msg = "Mailer Error: " . $mail->ErrorInfo;
        } else {
            $msg = "Message sent!";
        }
    } else {
        $msg = 'Failed to move file to ' . $uploadfile;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>PHPMailer Upload</title>
</head>
<body>
<?php if (empty($msg)) { ?>
    <form method="post" enctype="multipart/form-data">
        <input type="hidden" name="MAX_FILE_SIZE" value="1000000"> Select a file to upload: <input name="userfile" type="file">
        <input type="submit" value="Upload">
    </form>
<?php } else {
    echo $msg;
} ?>
</body>
</html>