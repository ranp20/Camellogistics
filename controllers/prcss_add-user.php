<?php
$r = "";
if(isset($_POST) && count($_POST) > 0){
  if(preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST['u-username'])){
    if(preg_match('/^[0-9a-zA-Z]+$/', $_POST['u-password'])){
      require_once '../models/users.php';
      $user       = new Users();
      $verifymail = $user->verify_email($_POST['u-username']);

      if($verifymail == "true"){
        $r = array(
          'res' => 'equals',
        );
      }else{
        $_token       = md5($_POST['u-username'] . $_POST['u-password']);
        $pass         = password_hash($_POST['u-password'], PASSWORD_BCRYPT, array('cost' => 12));
        $arr_userdata = [
          '_token'   => $_token,
          'username' => $_POST['u-username'],
          'password' => $pass,
        ];
        require_once 'add_user.php';
        $add_user = new Add_Users();
        $validate = $add_user->add($arr_userdata);

        if($validate == "true"){

          $getdata = $user->get_users($arr_userdata['username']);

          if(count($getdata) > 0){
            session_start();
            $_SESSION['user_camel'] = $getdata[0];
            $r = array(
              'res' => 'true',
              'received' => $getdata[0],
            );
          }else{
            $r = array(
              'res' => 'errinsert',
            );
          }
        }else{
          $r = array(
            'res' => 'errinsert',
          );
        }
      }
    }else{
      $r = array(
        'res' => 'error_pass',
      );
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
