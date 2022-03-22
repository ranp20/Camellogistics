<?php
if (isset($_POST) && count($_POST) > 0) {
  if (preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST['u-username'])) {
    if (preg_match('/^[0-9a-zA-Z]+$/', $_POST['u-password'])) {
      $arr_userdata = [
        'username' => $_POST['u-username'],
        'password' => $_POST['u-password'],
      ];
      require_once '../models/users.php';
      $user       = new Users();
      $verifymail = $user->verify_email($arr_userdata['username']);

      if ($verifymail == "true") {
        $res = array(
          'response' => 'equals',
        );
      } else {
        require_once 'add_user.php';
        $add_user = new Add_Users();
        $validate = $add_user->add($arr_userdata);

        if ($validate == "true") {

          $getdata = $user->get_users($arr_userdata['username']);

          if (count($getdata) > 0) {
            session_start();
            $_SESSION['user_camel'] = $getdata[0];

            $res = array(
              'response' => 'true',
              'received' => $getdata[0],
            );
          } else {
            $res = array(
              'response' => 'errinsert',
            );
          }
        } else {
          $res = array(
            'response' => 'errinsert',
          );
        }
      }
    } else {
      $res = array(
        'response' => 'error_pass',
      );
    }
  } else {
    $res = array(
      'response' => 'error_email',
    );
  }
} else {
  $res = array(
    'response' => 'false',
  );
}
die(json_encode($res));
