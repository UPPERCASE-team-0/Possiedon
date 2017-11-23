<?php
	extract($_POST);
	
	$file=fopen("userdetails.txt","w");
	if($pw==$cnf_pw)
	{
		$userData=$fl_nm."*".$usr_nm."*".$pw;
		fwrite($file,$userData);
		fclose($file);
		echo "Account created succesfully";
		header('Location: login.html');
		//exit();
	}
	header('Location: index.html');
	//sexit();
?>