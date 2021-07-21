<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<!-- -- API-WHATSAPP --- -->
<style type="text/css">
	/************************** API WHATSAPP **************************/
	#chat_wstp-icon{
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
	#chat_wstp-icon:hover{
		color: #fff;
	}
	.float{
		position:fixed;
		bottom:40px;
		right: 25px;
		background-color: #25d366;
		color:#FFF;
		border-radius:50px;
		text-align:center;
	  	font-size:30px;
		box-shadow: 2px 2px 12px 3px rgba(0,0,0,.12);
	  	z-index:100;
	}

	.float--contText{
		position: relative;
    width: max-content;
    height: 50px;
    padding: 0.8rem 5rem .8rem 2rem;
    font-size: 1rem;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
	}
	.float--contIconWps{
		width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #25d366;
    border-radius: 50%;
    right: 0;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 30%);
	}

  .float--contIconWps img{
  	width: 40px;
    height: 40px;
    vertical-align: middle;
    position: relative;
    top: 4px;
  }

	.my-float{
		margin-top:16px;
	}
  @media (min-width: 991px){
  	.float{
  		right: 60px;
  	}
  }
</style>
<a href="https://api.whatsapp.com/send?phone=51951488317&text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20plataforma." class="float" target="_blank" id="chat_wstp-icon">
	<div class="float--contText">
		<span>Asesor en Línea</span>
	</div>
	<div class="float--contIconWps">
		<img src="<?= $url  ?>assets/img/icons/whatsapp_api.svg" alt="">
	</div>
</a>