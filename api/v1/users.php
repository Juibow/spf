<?php
// Users
$app->get('/users', function() { 
    global $db;
    $rows = $db->select("spf_users","*",array());
    echoResponse(200, $rows);
});

$app->post('/users', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("spf_users", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "User added successfully.";
    echoResponse(200, $rows);
});

$app->put('/users/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("spf_users", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "User information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/users/:id', function($id) { 
    global $db;
    $rows = $db->delete("spf_users", array('email'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "User removed successfully.";
    echoResponse(200, $rows);
});

$app->get('/users/:id', function($id) { 
    global $db;
    $rows = $db->select("spf_users", array('uid'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "User got successfully.";
    echoResponse(200, $rows);
});

?>