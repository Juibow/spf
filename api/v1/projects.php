<?php

$app->get('/projects', function() { 
    global $db;
    $rows = $db->select("spf_projects","*",array());
    echoResponse(200, $rows);
});

// $app->get('/projects/:id', function($id) {
//     global $db;
//     $condition = array('project_ID'=>$id);
//     $rows = $db->select('projects', "*", $condition);
//         if($rows["status"]=="success")
//         $rows["message"] = "Project get successfully.";
//     echoResponse(200, $rows);
// });

$app->get('/GET/:table/:column/:value', function($table, $column, $value) {
    global $db;
    $condition = array($column=>$value);
    $rows = $db->select($table, "*", $condition);
        if($rows["status"]=="success")
        $rows["message"] = "Project get successfully.";
    echoResponse(200, $rows);
});

$app->post('/projects', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('project_description');
    global $db;
    $rows = $db->insert("spf_projects", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project added successfully.";
    echoResponse(200, $rows);
});

$app->put('/projects/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('project_ID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("spf_projects", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/projects/:id', function($id) { 
    global $db;
    $rows = $db->delete("spf_projects", array('project_ID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Project removed successfully.";
    echoResponse(200, $rows);
});

?>