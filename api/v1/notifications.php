<?php

$app->get('/notifications', function() { 
    global $db;
    $rows = $db->select("notifications","id,uid,title,student,description,progress,faculty,status",array());
    echoResponse(200, $rows);
});

$app->post('/notifications', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('notifications_content');
    global $db;
    $rows = $db->insert("notifications", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Notifications sent successfully.";
    echoResponse(200, $rows);
});

$app->put('/notifications/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("notifications", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Notifications information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/notifications/:id', function($id) { 
    global $db;
    $rows = $db->delete("notifications", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Notifications removed successfully.";
    echoResponse(200, $rows);
});

?>