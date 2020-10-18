<?php
//error_reporting(0);
defined('BASEPATH') OR exit('No direct script access allowed');
include 'vendor/autoload.php';
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/Pdf2text.php';
use Restserver\Libraries\REST_Controller;
date_default_timezone_set('Asia/Jakarta');

class Pdf_Viewer extends REST_Controller
{
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		$this->load->database();
		$this->load->helper('form', 'url');
		header('Content-Type: application/json; charset=UTF-8');
	}

	public function index_get()
	{
		//$this->validateAuth();
		
		$file_url = $this->input->get('pdf_file_url');

		$file = "https://www.kmsp-store.com/gosearch/documents/Machine_Learning__Simple_Linear_Regression_-_Artificial_intelligence_and_data_science.pdf";
        $filename = "Machine_Learning__Simple_Linear_Regression_-_Artificial_intelligence_and_data_science.pdf";
        header('Content-type: application/pdf');
        header('Content-Disposition: inline; filename="' . $filename . '"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));
        header('Accept-Ranges: bytes');
        readfile($file);
        
        //$url = $file;
        //$result = $this->get_remote_file_info($url);
        //var_dump($result);

		exit();
	}

	public function index_post()
	{
		header('HTTP/1.1 405 Method Not Allowed');
		echo json_encode(array(
					'statusCode'=>405,
					'status'=>false,
					'error'=>'Method Not Allowed',
					'error_code'=>'GoSearch-01'
					));
		exit();
	}

	public function index_put()
	{
		header('HTTP/1.1 405 Method Not Allowed');
		echo json_encode(array(
					'statusCode'=>405,
					'status'=>false,
					'error'=>'Method Not Allowed',
					'error_code'=>'GoSearch-01'
					));
		exit();
	}

	public function index_delete()
	{
		header('HTTP/1.1 405 Method Not Allowed');
		echo json_encode(array(
					'statusCode'=>405,
					'status'=>false,
					'error'=>'Method Not Allowed',
					'error_code'=>'GoSearch-01'
					));
		exit();
	}

	public function index_patch()
	{
		header('HTTP/1.1 405 Method Not Allowed');
		echo json_encode(array(
					'statusCode'=>405,
					'status'=>false,
					'error'=>'Method Not Allowed',
					'error_code'=>'GoSearch-01'
					));
		exit();
	}

	public function validateAuth()
	{
		$detectGoSearchAPIKeyHeader = $this->input->get_request_header('GOSEARCH-API-KEY');

		if(preg_match('/[A-Z]/', $detectGoSearchAPIKeyHeader))
		{
			header('HTTP/1.1 403 Forbidden');
			echo json_encode(array(
						'statusCode'=>403,
						'status'=>false,
						'error'=>'Invalid API key',
						'error_code'=>'GoSearch-02'
						));
			exit();
		}

		$detectAuth = $this->output->get_output();
		$decodeDetectAuth = json_decode($detectAuth, true);
		
		$authCode = $decodeDetectAuth['error'];

		if($authCode == "Invalid API key ")
		{
			header('HTTP/1.1 403 Forbidden');
			echo json_encode(array(
						'statusCode'=>403,
						'status'=>false,
						'error'=>'Invalid API key',
						'error_code'=>'GoSearch-02'
						));
			exit();
		}

		if($authCode == "Unauthorized")
		{
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array(
						'statusCode'=>401,
						'status'=>false,
						'error'=>'Unauthorized',
						'error_code'=>'GoSearch-03'
						));
			exit();
		}
	}
	
	public function get_remote_file_info($url)
	{
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, TRUE);
        curl_setopt($ch, CURLOPT_NOBODY, TRUE);
        $data = curl_exec($ch);
        $fileSize = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $httpResponseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [
            'fileExists' => (int) $httpResponseCode == 200,
            'fileSize' => (int) $fileSize
        ];
    }
}
?>