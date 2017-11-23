<?php
	extract($_POST);
	
	$file=fopen("userdetails.txt","r");
	
	while(!feof($file)){

		$userData=fgets($file);
		$arr=(explode("*", $userData));
		if($arr[1]== $usr_nm && trim($arr[2])== $pw ){
			$c=1;
		}
		else{
		$c=0;
		}
	}
	if($c==1)
		header('Location: homepage.html');
		//die();
		//echo "<a href=\\"homepage.html\\">Click here to visit site</a>";
	else
		header('Location: login_error.html');
	fwrite($file,$userData);
	fclose($file);
	echo "Account created succesfully";
?>