<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Products
$app->get('/products', function() { 
    global $db;
    $rows = $db->select("products","id,sku,title,description,student,mrp,faculty,image,progress,status",array());
    echoResponse(200, $rows);
});

$app->post('/products', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('title');
    global $db;
    $rows = $db->insert("products", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) { 
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Project removed successfully.";
    echoResponse(200, $rows);
});

// Works
$app->get('/works', function() { 
    global $db;
    $rows = $db->select("works","id,sku,title,description,student,mrp,faculty,image,progress,status",array());
    echoResponse(200, $rows);
});

$app->post('/works', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('title');
    global $db;
    $rows = $db->insert("works", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project added successfully.";
    echoResponse(200, $rows);
});

$app->put('/works/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("works", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Project information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/works/:id', function($id) { 
    global $db;
    $rows = $db->delete("works", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Project removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>