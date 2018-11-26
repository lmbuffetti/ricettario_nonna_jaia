<?php
include_once 'PHPRouter/Request.php';
include_once 'PHPRouter/Router.php';
$router = new Router(new Request);
$router->get('/', function() {
    return <<<HTML
  <h1>Hello world</h1>
HTML;
});
$router->get('/admin', function($request) {
    includeWithVariables('./PHPRouter/template.php', array('title' => 'Header Title'));
});
$router->post('/data', function($request) {
    return json_encode($request->getBody());
});

function includeWithVariables($filePath, $variables = array(), $print = true)
{
    $output = NULL;
    if(file_exists($filePath)){
        // Extract the variables to a local namespace
        extract($variables);

        // Start output buffering
        ob_start();

        // Include the template file
        include $filePath;

        // End buffering and return its contents
        $output = ob_get_clean();
    }
    if ($print) {
        print $output;
    }
    return $output;

}