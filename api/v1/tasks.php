<?php
// Tasks
$app->get('/tasks', function() { 
    global $db;
    $rows = $db->select("spf_tasks","*",array());
    echoResponse(200, $rows);
});

$app->post('/tasks', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("spf_tasks", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Task added successfully.";
    echoResponse(200, $rows);
});

$app->put('/tasks/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('task_ID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("spf_tasks", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Task information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/tasks/:id', function($id) { 
    global $db;
    $rows = $db->delete("spf_tasks", array('task_ID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Task removed successfully.";
    echoResponse(200, $rows);
});
?>