<?php
// change the 4 variables below
$yourName = 'info@zero-6.it';
$yourEmail = 'info@zero-6.it';
$yourEmail = 'bernat@itnig.net';
$yourSubject = 'Messaggio nel sito web Zero6';
$referringPage = 'http://www.zero-6.it/scripts/contact.php';


header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="utf-8" standalone="yes"?>';

echo '<resultset>';

function cleanPosUrl ($str) {
$nStr = $str;
$nStr = str_replace("**am**","&",$nStr);
$nStr = str_replace("**pl**","+",$nStr);
$nStr = str_replace("**eq**","=",$nStr);
return stripslashes($nStr);
}
	if ( $_GET['contact'] == true && $_GET['xml'] == true && isset($_POST['posText']) ) {
	$to = $yourName;
	$subject = 'Messaggio nel sito web Zero6: '.cleanPosUrl($_POST['posRegard']);
	$message = cleanPosUrl($_POST['posText']);
	$headers = "From: ".cleanPosUrl($_POST['posName'])." <".cleanPosUrl($_POST['posEmail']).">\r\n";
	$headers .= 'To: '.$yourName.' <'.$yourEmail.'>'."\r\n";
	$mailit = mail($to,$subject,$message,$headers);
		
		if ( @$mailit )
		{ 
			$posStatus = 'OK'; $posConfirmation = 'La mail è stata inviata con successo!'; 
		}
		else
		{ 
			$posStatus = 'NOTOK'; $posConfirmation = 'La mail non può essere mandata. La preghiamo di provare nuovamente'; 
		}
		
		if ( $_POST['selfCC'] == 'send' )
		{
			$ccEmail = cleanPosUrl($_POST['posEmail']);
			@mail($ccEmail,$subject,$message,"From: Io stesso <".$ccEmail.">\r\nTo: Io stesso");
		}
	
	echo '
		<status>'.$posStatus.'</status>
		<confirmation>'.$posConfirmation.'</confirmation>
		<regarding>'.cleanPosUrl($_POST['posRegard']).'</regarding>
		';
	}
echo'	</resultset>';

?>