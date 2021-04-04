var toggled = false;

let openBtn = document.querySelector(".openSideNav");

function showNav() {
  document.querySelector(".sideNav").style.width = "300px";
  document.querySelector('.main-content').style.marginLeft = "300px";
  console.log('test');
}

function hideNav() {
  document.querySelector(".sideNav").style.width = "0";
  document.querySelector('.main-content').style.marginLeft = "0px";
}


var user = "anonymous";
// authentication section
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  user

  var profile = googleUser.getBasicProfile();
  user = profile.getName();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var data = {"id_token":id_token};
  var requestURL = '/tokensignin';

  $.ajax({
    type: "POST",
    url: requestURL,
    data: data,
    dataType: "json"
  });

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}


$('video').on('play', function (e) {
  $("#carousel").carousel('pause');
});
$('video').on('stop pause ended', function (e) {
  $("#carousel").carousel();
});

$('video').on('play', function (e) {
  $("#carousel2").carousel('pause');
});
$('video').on('stop pause ended', function (e) {
  $("#carousel2").carousel();
});

$('.carousel').carousel({
  pause: "hover"
})
$('.carousel2').carousel({
  pause: "hover"
})