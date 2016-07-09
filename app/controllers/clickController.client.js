(function() {
  'use strict'

  var addButton = document.querySelector('.btn-add');
  var deleteButton = document.querySelector('.btn-delete');
  var clickNbr = document.querySelector('#click-nbr');
  var commentButton = document.querySelector('.btn-comment');
  var apiUrl = appUrl + '/api/:id/clicks';
  var commmentUrl = 'http://localhost:8080/api/comments';

  function updateClickCount(data) {
    var clicksObject = JSON.parse(data);
    clickNbr.innerHTML = clicksObject.clicks;
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

  addButton.addEventListener('click', function() {
    ajaxFunctions.ajaxRequest('POST', apiUrl, function() {
      ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount)
    });
  }, false);

  deleteButton.addEventListener('click', function() {
    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function() {
      ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
    });
  }, false);

  commentButton.addEventListener('click', function() {
    ajaxFunctions.ajaxRequest('POST', commmentUrl, function() {
      ajaxFunctions.ajaxRequest('GET', commmentUrl, updateComments);
    });
  }, false);

}());
