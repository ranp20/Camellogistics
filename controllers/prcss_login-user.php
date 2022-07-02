<?php
$r = "";
if(isset($_POST) && count($_POST) > 0){
  if(preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST['u-username'])){
    if($_POST['u-username'] != "Invitado"){
      $arr_userdatalogin = [
        'username' => $_POST['u-username'],
        'password' => $_POST['u-password'],
      ];
      require_once '../models/users.php';
      $user = new Users();
      $verifyemail = $user->get_usersverifylogin($arr_userdatalogin['username']);
      if($verifyemail != "" && count($verifyemail) > 0){
        if(password_verify($arr_userdatalogin['password'], $verifyemail[0]['password'])){
          $getdata = $user->get_users($arr_userdatalogin['username']);

          if(count($getdata) > 0){
            session_start();
            $_SESSION['user_camel'] = $getdata[0];

            $r = array(
              'res' => 'true',
              'received' => $getdata[0],
            );
          }else{
            $r = array(
              'res' => 'false',
            );
          }
        }else{
          $r = array(
            'res' => 'err_notequalpass',
          );
        }
      }else{
        $r = array(
          'res' => 'err_emailnotexist',
        );
      }
    }else if($_POST['u-username'] == "Invitado" && $_POST['u-typeorder'] == 0) {
      session_start();
      $getdata = [
        0 => [
          'username' => 'Invitado',
        ],
      ];
      $_SESSION['user_camel'] = $getdata[0];

      $r = array(
        'res' => 'true',
        'received' => $getdata[0],
      );
    }else{
      header("Location: ../");
    }
  }else{
    $r = array(
      'res' => 'error_email',
    );
  }
}else{
  $r = array(
    'res' => 'false',
  );
}
die(json_encode($r));