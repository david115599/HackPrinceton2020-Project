var toggled = false;

let openBtn = document.querySelector(".openSideNav");
openBtn.addEventListener("click", () => {
  toggled = !toggled;
  if (toggled) {
    showNav();
  }
  if (!toggled) {
    hideNav();
  }
});

function showNav() {
  document.querySelector(".sideNav").style.width = "300px";
  document.querySelector('.main-content').style.marginLeft = "300px";
  console.log('test');
}

function hideNav() {
  document.querySelector(".sideNav").style.width = "0";
  document.querySelector('.main-content').style.marginLeft = "0px";
}



// authentication section
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  var profile = googleUser.getBasicProfile();
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
/*$(document).ready(function () {
  $("#my_button").click(function (event) {

    var apiKey = 'wvz6nlmPtKUxSUTEDqeDaJpO1Wkv8jC6zpEQZups';
    var requestURL = 'https://api.propublica.org/congress/v1/bills/search.json?query=sanders';

    $.ajax({
      url: requestURL,
      type: "GET",
      dataType: 'json',
      headers: {
        'X-API-Key': apiKey
      }
    }).done(function (data) {
      var content;
      for (var i = 0; i < data.results[0].bills.length; i++) {
        var bill = data.results[0].bills[i];
        content += '<div class="card">'
        content += '<div class="card-header" id="heading' + i + '">';
        content += '<h2 class="mb-0">';
        content += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">';
        content += "" + bill.short_title + "";
        content += '</button>';
        content += '</h2></div>  <div id="collapse' + i + '" class="collapse" aria-labelledby="heading' + i + '" data-parent="#accordionExample"> <div class="card-body">  <div id="bills">';
        content += "" + bill.title + ""
        content += '</div></div></div></div>';
      }
      $('#bills').html(content);
      console.log(data)
    });
  });
});


const selectElement = document.querySelector('#corrup');

selectElement.addEventListener('change', (event) => {
  var val = $("#corrup").attr("value");
  if (val == 0) {
    var content = " ";
    for (var i = 116; i >= 80; i--) {
      content += '<option value= ' + i + ' >' + i + ' </option>'
    }
    $('#years').html(content);
  } else {
    var content = " ";
    for (var i = 116; i >= 102; i--) {
      content += '<option value= ' + i + ' >' + i + ' </option>'
    }
    $('#years').html(content);
  }
});*/