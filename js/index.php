<?php

	//echo "hola"
	ini_set("display_errors",1);
	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();

	$app = new \Slim\Slim();

	require 'mailer/PHPMailerAutoload.php';

	$app->get('/users', 'getUsers');
	$app->get('/user/:email', 'getUser');
	$app->get('/questions', 'getQuestions');
	$app->get('/commitments', 'getCommitments');
	$app->get('/toys/:page', 'getToys');
	$app->post('/users', 'addUsers');
	$app->post('/commitments', 'addCommitments');
	$app->post('/questions', 'addQuestions');
	$app->post('/answers/:id', 'addAnswers');
	$app->post('/letter', 'addLetter');
	$app->get('/letter/:username', 'getLetter');

	$app->get('/countries', 'getCountries');
	$app->get('/cities/:id', 'getCities');

	$app->get('/ages', 'getAges');

	$app->post('/email-letter', 'sendLetter');
	//$app->get('/email-letter', 'sendLetter');



	$app->run();

	function  addAnswers($id){
		//print($id);

		$request_body = file_get_contents('php://input');
		//$request_body = htmlspecialchars($_POST["test"]);
		//print($request_body);
		$res = json_decode($request_body);
		$res  = objectToArray($res);
		$ans = $res['test'];
		//$level = $id;	
		$sql_query = "UPDATE questions SET answer='$ans' WHERE level=$id";

		try{
			//print($sql_query);
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);

			$dbCon = null;
			echo '{"success":"true"}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}

	/*function getToys(){
		
		$sql_query = "SELECT * FROM games";

		try{
			$dbConRemote = getConnectionRemote();
			$stmt = $dbConRemote->query($sql_query);
			$products = $stmt->fetchAll(PDO::FETCH_OBJ);
			//print_r($users);
			$dbConRemote = null;
			echo '{"products": ' . json_encode($products) . '}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}*/

	function getCountries(){
		$sql_query = "SELECT * FROM country";

		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);
			$countries = $stmt->fetchAll(PDO::FETCH_ASSOC);
			//print_r($countries);
			$output = array();

			foreach ($countries as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $countries[$key]);	
			}
			$dbCon = null;
			echo '{"countries": ' . json_encode($output) . '}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function getUser($email){
		$sql_query = "SELECT `name` FROM users WHERE email_parent = '".$email."'";

		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);
			$user = $stmt->fetchAll(PDO::FETCH_ASSOC);
			//print_r($countries);
			$output = array();

			foreach ($user as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $user[$key]);	
			}
			$dbCon = null;

			if(!empty($output)){
				echo '{"user": ' . json_encode($output) . ' , "success" : true}';	
			}else{
				echo '{"user": ' . json_encode($output) . ' , "success" : false}';
			}
			
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function getAges(){
		$sql_query = "SELECT * FROM ages";

		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);
			$ages = $stmt->fetchAll(PDO::FETCH_ASSOC);
			//print_r($countries);
			$output = array();

			foreach ($ages as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $ages[$key]);	
			}
			$dbCon = null;
			echo '{"ages": ' . json_encode($output) . '}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function getCities($id){
		$sql_query = "SELECT * FROM city WHERE id_country = '$id'";

		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);
			$cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
			//print_r($countries);
			$output = array();

			foreach ($cities as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $cities[$key]);	
			}
			$dbCon = null;
			echo '{"cities": ' . json_encode($output) . '}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function getToys($page){
		
		//echo $page;

		$page = $page;
		$per_page = 8;
		$start = $page * $per_page;

		$sql_query = "SELECT id_product, short_desc, image FROM products limit $start, $per_page";

		try{
			//$dbConRemote = getConnectionRemote();
			$dbConRemote = getConnectionProductionToys();
			$q = $dbConRemote->query($sql_query);
			$output = array();
			$commits = $q->fetchAll(PDO::FETCH_ASSOC);
			foreach ($commits as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $commits[$key]);	
			}

			//print(json_encode($output));
			//print_r($questions);
			$dbConRemote = null;
		
			echo '{"toys": ' . json_encode($output) .'}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}

	function objectToArray($d) {
		if (is_object($d)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$d = get_object_vars($d);
		}
 
		if (is_array($d)) {
			/*
			* Return array converted to object
			* Using __FUNCTION__ (Magic constant)
			* for recursive call
			*/
			return array_map(__FUNCTION__, $d);
		}
		else {
			// Return array
			return $d;
		}
	}

	function getUsers(){
		$sql_query = "SELECT * FROM users";

		try{
			$dbCon = getConnection();
			//$dbCon = getConnectionProductionLetter();
			$stmt = $dbCon->query($sql_query);
			$output = array();
			$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

			foreach ($users as $key => $val){
				//print_r($users);
				$output[$key]=array_map('utf8_encode', $users[$key]);	
			}
			//print_r($users);
			$dbCon = null;
			echo '{"users": ' . json_encode($users) . '}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}

	function getQuestions(){
		$sql_query = "SELECT * FROM questions";

		$sql_query2 = "SELECT * FROM answers";

		try{
			//$dbCons = getConnection();
			$dbCons = getConnectionProductionLetter();
			//$dbCon2 = getConnection();
			$dbCon2 = getConnectionProductionLetter();
			$q = $dbCons->query($sql_query);
			$stmt2 = $dbCon2->query($sql_query2);
			$i = 0;
			$output = array();
			$questions = $q->fetchAll(PDO::FETCH_ASSOC);
			$answers = $stmt2->fetchAll(PDO::FETCH_OBJ);
			foreach ($questions as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $questions[$key]);	
			}

			//print(json_encode($output));
			//print_r($questions);
			$dbCons = null;

			$dbCon2 = null;
		
			echo '{"questions": ' . json_encode($output) . ', "answers": '.json_encode($answers).' }';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}

	function getCommitments(){
		$sql_query = "SELECT * FROM commitments";

		try{
			//$dbCons = getConnection();
			$dbCons = getConnectionProductionLetter();
			$q = $dbCons->query($sql_query);
			$output = array();
			$commits = $q->fetchAll(PDO::FETCH_ASSOC);
			foreach ($commits as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $commits[$key]);	
			}

			//print(json_encode($output));
			//print_r($questions);
			$dbCons = null;
		
			echo '{"commitments": ' . json_encode($output) .'}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}

	function addCommitments(){
		global $app;

		$req  = $app->request();
		//$json = json_decode($req->post('commitment'));

		$data = json_decode($req->getBody(),true);

		//print_r($data);

		$sql = "INSERT INTO commitment_selected (`compromiso`,`custom_compromiso`,`email_parent_user`,`email_user`) VALUES ('".$data['commitment']['commitment_selected']."','".utf8_decode($data['commitment']['custom_commitment_selected'])."','".$data['commitment']['email_parent']."','".$data['commitment']['email']."')";
	
		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$dbCon->query($sql);
			$commitment = $dbCon->lastInsertId();
        	$dbCon = null;
        	echo '{"commitment": ' . $commitment . ', "success":"true"}';
		}catch(PDOException $e) {
        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    	}
	}

	function getLetter($username){
		//echo $page;

		//$sql_query = "SELECT * FROM letter WHERE username='".utf8_decode($username)."'";
		$sql_query = "SELECT `username`, `answer1`, `answer2`, `answer3`, `answer4`, `compromiso`,`custom_compromiso`, `country`, `city`, `email_parent`, `email`, `toyname` FROM letter AS l INNER JOIN toys AS t INNER JOIN letters_toys AS lt ON l.id = lt.id_letter AND t.id = lt.id_toy WHERE username='".utf8_decode($username)."'";
		try{
			//$dbCon = getConnection();
			$dbCon = getConnectionProductionLetter();
			$q = $dbCon->query($sql_query);
			$output = array();
			$toys = array();
			$letter = $q->fetchAll(PDO::FETCH_ASSOC);

			//print_r($letter);
			foreach ($letter as $key => $val){
				
				//print_r($questions);
				$output[$key]=array_map('utf8_encode', $letter[$key]);
				$toys[$key] = $letter[$key]['toyname'];	
			}
			//print(json_encode($output));
			

			$dbCon = null;
		
			echo '{"letter": ' . json_encode($output[0]) .', "toys" : '.json_encode($toys).'}';
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function addLetter(){
		global $app;

		$req  = $app->request();
		//$json = json_decode($req->post('commitment'));

		$data = json_decode($req->getBody(),true);

		//print_r($data);
		if(!empty($data['toys']['mytoys'])){



		//print_r($data);

			$sql_user = "SELECT username FROM letter WHERE username = '".utf8_decode($data['letter']['username'])."'";
			$sql_truncate_letter = "TRUNCATE TABLE letter";
			$sql_truncate_letter_toys = "TRUNCATE TABLE letters_toys";
			$sql_truncate_toys = "TRUNCATE TABLE toys";
			//$dbConuser = getConnection();
			$dbConuser = getConnectionProductionLetter();
			$stmtuser = $dbConuser->query($sql_user);
			$user = $stmtuser->fetchAll(PDO::FETCH_ASSOC);

			if(!empty($user)){
				//echo "borre";
				$dbConuser->query($sql_truncate_letter);
				$dbConuser->query($sql_truncate_letter_toys);
				$dbConuser->query($sql_truncate_toys);
			}	



			$sql = "INSERT INTO letter (`username`,`answer1`,`refquestion1`, `answer2`, `refquestion2`, `answer3`, `refquestion3`, `answer4`, `refquestion4`, `compromiso`, `custom_compromiso`, `country`, `city`, `email_parent`, `email`, `genero`) VALUES ('".utf8_decode($data['letter']['username'])."','".$data['letter']['answer1']."','".utf8_decode($data['letter']['question1'])."','".$data['letter']['answer2']."','".utf8_decode($data['letter']['question2'])."','".$data['letter']['answer3']."','".utf8_decode($data['letter']['question3'])."','".$data['letter']['answer4']."', '".utf8_decode($data['letter']['question4'])."', '".utf8_decode($data['letter']['commitment'])."', '".utf8_decode($data['letter']['customcommitment'])."', '".utf8_decode($data['letter']['country'])."', '".utf8_decode($data['letter']['city'])."', '".utf8_decode($data['letter']['email_parent'])."', '".utf8_decode($data['letter']['email'])."', '".utf8_decode($data['letter']['genere'])."')";
			
			try{
				//$dbCon = getConnection();
				$dbCon = getConnectionProductionLetter();
				$dbCon->query($sql);

				foreach ($data['toys']['mytoys'] as $k => $v) {

					
					$sql2 = "INSERT INTO toys (`toyname`) VALUES ('".utf8_decode($v)."')";
				
					//$dbCon2 = getConnection();
					$dbCon2 = getConnectionProductionLetter();
					$dbCon2->query($sql2);

					$letterid = $dbCon->lastInsertId();
					$toyid = $dbCon2->lastInsertId();
		        	

		        	$sql3 = "INSERT INTO letters_toys (`id_letter`, `id_toy`) VALUES ($letterid, $toyid)";

		        	//$dbCon3 = getConnection();
		        	$dbCon3 = getConnectionProductionLetter();
		        	$dbCon3->query($sql3);
		        		
		        }
		        $dbCon = null;
		        $dbCon2 = null;
		        $dbCon3 = null;
		        $dbConuser = null;
		        echo '{"letter": ' . $letterid . ', "success":true}';
			}catch(PDOException $e) {
	        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	    	}
	    }else{
	    	 echo '{"success": false , "error" : "no toys selected"}';
	    }
	}


	function sendLetter(){
		global $app;

		$req  = $app->request();
		$data = json_decode($req->getBody(),true);

		//print_r($data);

		$mail = new PHPMailer;

		$mail->isSMTP();
		$mail->SMTPDebug = 0;                                      // Set mailer to use SMTP
		$mail->Host = 'smtp.gmail.com';  					  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'kreiselnavidad@gmail.com';         // SMTP username
		$mail->Password = 'NAVIDAD123456';                 // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;
		/*$mail->SMTPSecure = 'ssl' ;
		$mail->Port = 465;*/

		$mail->From = 'kreiselnavidad@gmail.com';
		$mail->FromName = 'Carta de Navidad';
		$mail->addAddress($data['data']['email_parent']);     // Add a recipient       // Name is optional
		//$mail->addAddress('elwilli855@hotmail.com', 'willians2');
		//$mail->addReplyTo('info@example.com', 'Information');

		$mail->isHTML(true);

		$name = $data['data']['name'];
		$answer1 = $data['data']['answer1'];
		if($data['data']['answer2'] == 'SI')
			$answer2 = "";
		else
			$answer2 = $data['data']['answer2'];

		if($data['data']['answer3'] == 'SI')
			$answer3 = "";
		else
			$answer3 = $data['data']['answer2'];

		$compromiso = $data['data']['compromiso'];
		$custom_compromiso = $data['data']['custom_compromiso'];

		$listas = "";
		for ($i=0; $i < count($data['toys']); $i++) {
			$listas .=  "<li> - ".$data['toys'][$i]."</li>";
		}

		

		$str = "<!DOCTYPE html>
		<html>
		<head>
			<meta charset='UTF-8'>
			<title>Carta de navidad</title>
			<style>
				#letter{
					background: url(../assets/fondostart.png);
					border:2px solid white;
					height: 600px;
					width: 800px;
					margin-left: auto;
					margin-right: auto;
				}
				.text_letter{
					width: 550px;
					height: 103px;
					position: relative;
					margin: 0 auto;
					top: 14em;
				}

				.text_letter p{
					color: #328968;
					font-size: 1.3em;
					line-height: 1.2em;
					text-align: justify;
				}
				.list_toys{
					width: 267px;
					height: 180px;
					margin: 15em 0 0 2.68em;
				}

				.list_toys ul{
					list-style: none;
					padding: 0 0 0 0.8em;
					color : #328968;
					font-size: 0.9em;
				}
				.btnletter{
					z-index: 99999999;
				}
				.btnletter .btnimgletter{
					width: 226px;
					height: 45px;
					margin-left: auto;
					margin-right: auto;
					margin-top: -2.5em;
					position: relative;
				}
			</style>
		</head>
		<body>

			<div id='letter' style='background-color:#ccc; background: url(http://www.kreisel.com/cartadenavidad/assets/fondostart.png);border:2px solid white;height: 600px;width: 800px;margin-left: auto;margin-right: auto;'>
			 	  <div class='container_letter' style='background: url(http://www.kreisel.com/cartadenavidad/assets/bgletter.png);width: 637px;height: 572px;margin-top: 10px;margin-left: auto;margin-right: auto;position: relative;'>
				  	
						<div class='text_letter' style='width: 550px; height: 103px; position: relative; margin: 0 auto; top:28em;'>
							<p style='color: #328968;font-size: 1.3em;line-height: 1.2em;text-align: justify; padding-top:12em;'>Mi nombre  es $name, este año me porté $answer1 ,$answer2 hice todas mis tareas, $answer3 me comí toda mi comida y en el año 2015 me comprometo a $compromiso y a $custom_compromiso. Quisiera recibir estos juguetes en Navidad :</p>
						</div>

						<div class='list_toys' style='width: 267px;height: 180px;margin: 3em 0 0 2.68em;'>
							<ul style='list-style: none;padding: 0 0 0 0.8em;color : #328968; font-size: 0.9em;'>
								$listas
							</ul>
						</div>
						
				  </div>


		 	</div>
			
		</body>
		</html>";
		$mail->Subject = 'Carta de navidad Kreisel';
		$mail->Body    = utf8_decode($str);
		//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		if(!$mail->send()) {
			//echo $mail->ErrorInfo;
		    echo '{"success": false , "message" : "No se pudo enviar el correo"}';
		} else {
		    echo '{"success": true , "message" : "Tu carta ha sido enviada"}';
		}




	}

	function addQuestions(){
		global $app;

		$req  = $app->request();
		//$json = json_decode($req->post('commitment'));

		$data = json_decode($req->getBody(),true);

		//print_r($data);

		foreach ($data['questions'] as $k => $v) {
			
			//print_r($v['question']);
			//$v = array_map('utf8_encode', $v);
			$sql = "INSERT INTO question_selected (`question`,`answer`,`level`,`email_parent_user`,`email_user`,`id_user`) VALUES ('".utf8_decode($v['question'])."','".$v['answer']."','".$v['level']."','".$v['email_parent']."','".$v['email']."','".$v['iduser']."')";
	
			try{
				$dbCon = getConnection();
				//$dbCon = getConnectionProductionLetter();
				$dbCon->query($sql);
				$question = $dbCon->lastInsertId();
	        	$dbCon = null;
	        	echo '{"question": ' . $question . ', "success":"true"}';
			}catch(PDOException $e) {
	        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	    	}
		}

		/*$sql = "INSERT INTO question_selected (`compromiso`,`email_parent_user`,`email_user`) VALUES ('".$data['question']['commitment_selected']."','".$data['question']['email_parent']."','".$data['question']['email']."')";
	
		try{
			$dbCon = getConnection();
			$dbCon->query($sql);
			$commitment = $dbCon->lastInsertId();
        	$dbCon = null;
        	echo '{"commitment": ' . $commitment . ', "success":"true"}';
		}catch(PDOException $e) {
        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    	}*/
	}



	function addUsers(){
		global $app;

		$req = $app->request();
		$paramName = $req->params('name');
		//echo $paramName;
		$paramCountry = $req->params('country');
		$paramCity = $req->params('city');
		// $paramDir;
		$paramEmailParent = $req->params('email_parent');
		$paramEmail = $req->params('email');
		$paramEdad = $req->params('edad');
		$paramGenero = $req->params('genero');

		$validsql = "SELECT email_parent, email FROM users WHERE email_parent='".$paramEmailParent."' AND email='".$paramEmail."'";

		try{
			//$dbConvalid = getConnection();
			$dbConvalid = getConnectionProductionLetter();
			$stmtvalid = $dbConvalid->query($validsql);
			$user = $stmtvalid->fetchAll(PDO::FETCH_ASSOC);

			if(empty($user)){
				//echo "estoy vacio es decir no existo";

				$sql = "INSERT INTO users (`name`,`id_country`,`id_provincia`,`email_parent`, `email`, `edad`, `genero`) VALUES ('".$paramName."','".$paramCountry."','".$paramCity."','".$paramEmailParent."','".$paramEmail."','".$paramEdad."','".utf8_decode($paramGenero)."')";

				try{
					//$dbCon = getConnection();
					$dbCon = getConnectionProductionLetter();
					//echo $sql;
					$dbCon->query($sql);
					$user = $dbCon->lastInsertId();
					$sql_query = "SELECT * FROM users WHERE id='".$user."'";
					$stmt = $dbCon->query($sql_query);

					$output = array();
					$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

					foreach ($users as $key => $val){
						//print_r($users);
						$output[$key]=array_map('utf8_encode', $users[$key]);	
					}
		        	$dbCon = null;
		        	echo '{"users": ' . json_encode($output) . ', "success":"true"}';
				}catch(PDOException $e) {
		        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		    	}
			}else{
				echo '{"user_repeat": "true"}';
			}
        	$dbConvalid = null;


		}catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}

		//$sql = "INSERT INTO users (`name`,`id_country`,`id_provincia`,`email_parent`, `email`, `edad`) VALUES (:name, :direction, :email_parent, :email, :edad)";

		/*$sql = "INSERT INTO users (`name`,`id_country`,`id_provincia`,`email_parent`, `email`, `edad`) VALUES ('".$paramName."','".$paramCountry."','".$paramCity."','".$paramEmailParent."','".$paramEmail."','".$paramEdad."')";


		try{
			$dbCon = getConnection();
			//echo $sql;
			$dbCon->query($sql);
			$user = $dbCon->lastInsertId();
			$sql_query = "SELECT * FROM users WHERE id='".$user."'";
			$stmt = $dbCon->query($sql_query);
			$users = $stmt->fetchAll(PDO::FETCH_OBJ);
        	$dbCon = null;
        	echo '{"users": ' . json_encode($users) . ', "success":"true"}';
		}catch(PDOException $e) {
        	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    	}*/
	}

	/*$sql = "INSERT INTO users (`name`,`direccion`,`email_parent`, `email`, `edad`) VALUES ('willow', 'el centro', 'pelota@gmail.com', 'pelota2@gmail.com', 20)";


	try{
		$dbCon = getConnection();
		echo $sql;
		$dbCon->query($sql);
		/*$stmt->bindParam("name", $paramName)
		$stmt->bindParam("direction", $paramDir)
		$stmt->bindParam("email_parent", $paramEmailParent)
		$stmt->bindParam("email", $paramEmail)
		$stmt->bindParam("edad", $paramEdad)
		$stmt->execute();
		$user->id = $dbCon->lastInsertId();
    	$dbCon = null;
    	echo json_encode($user);
	}catch(PDOException $e) {
    	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}*/


	function getConnection() {
	    try {
	        $db_username = "root";
	        $db_password = "";
	        $conn = new PDO('mysql:host=localhost;dbname=cartadenavidad', $db_username, $db_password);
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    } catch(PDOException $e) {
	        echo 'ERROR: ' . $e->getMessage();
	    }
	    return $conn;
	}

	function getConnectionRemote(){
		try {
	        /*$db_username = "kreis1_carta";
	        $db_password = "CARTA123456.";*/

	        $db_username = "root";
	        $db_password = "";
	        $conn2 = new PDO('mysql:host=localhost;dbname=kreis1_2012', $db_username, $db_password);
	        $conn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    } catch(PDOException $e) {
	        echo 'ERROR: ' . $e->getMessage();
	    }
	    return $conn2;	
	}

	function getConnectionProductionToys(){
		try {
	        $db_username = "kreis1_carta";
	        $db_password = "CARTA123456.";

	        /*$db_username = "root";
	        $db_password = "";*/
	        $conn2 = new PDO('mysql:host=localhost;dbname=kreis1_2012', $db_username, $db_password);
	        $conn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    } catch(PDOException $e) {
	        echo 'ERROR: ' . $e->getMessage();
	    }
	    return $conn2;
	}

	function getConnectionProductionLetter(){
		try {
	        $db_username = "kreis1_carta";
	        $db_password = "CARTA123456.";

	        /*$db_username = "root";
	        $db_password = "";*/
	        $conn2 = new PDO('mysql:host=localhost;dbname=kreis1_cartadenavidad', $db_username, $db_password);
	        $conn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    } catch(PDOException $e) {
	        echo 'ERROR: ' . $e->getMessage();
	    }
	    return $conn2;
	}

	/*function getConnectionRemote(){
		
        $db_username = "kreis1_carta";
        $db_password = "CARTA123456.";
        $conn2 = mysql_connect("72.29.82.210",$db_username,$db_password);
        
        if  (!$conn2)
			   die('No pudo conectarse: ' . mysql_error());


	    return $conn2;	
	}*/
?>