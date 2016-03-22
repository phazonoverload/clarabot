function getCredentials(cb) {
  var data = {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  };

  return $.ajax({
    'url': 'https://api.clarifai.com/v1/token',
    'data': data,
    'type': 'POST'
  })
  .then(function(r) {
    localStorage.setItem('accessToken', r.access_token);
    localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
    cb();
  });
}

function postImage(imgurl) {
  var data = {
    'url': imgurl
  };
  var accessToken = localStorage.getItem('accessToken');

  return $.ajax({
    'url': 'https://api.clarifai.com/v1/tag',
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    },
    'data': data,
    'type': 'POST'
  }).then(function(r){
    parseResponse(r);
  });
}

function parseResponse(resp) {
  var tags = [];
  if (resp.status_code === 'OK') {
    var results = resp.results;
    var tags = results[0].result.tag.classes;
    var docId = results[0].result.docid;
  } else {
    console.log('Sorry, something is wrong.');
  }
  $('#tags').text(tags.toString().replace(/,/g, '/'));
  tagFormatting();
}

function tagFormatting() {
  var tagArray = $('#tags').html().split('/');
  console.log(tagArray);
  $(tagArray).each(function(i, tag) {
    $('ul').append('<div class="tag">' + tag + '</div>')
  });
  $('#tags').remove();
}

function run(imgurl) {
  if (localStorage.getItem('tokenTimeStamp') - Math.floor(Date.now() / 1000) > 86400
    || localStorage.getItem('accessToken') === null) {
    getCredentials(function() {
      postImage(imgurl);
    });
  } else {
    postImage(imgurl);
  }
}

var passedUrl = window.location.href.split("q=")[1];
$(document).ready(function() {
  $('#imgurl').attr('value', passedUrl);
  $('button').click();
  $('.image').empty();
  $('.image').append('<img src="' + passedUrl + '">');
});
