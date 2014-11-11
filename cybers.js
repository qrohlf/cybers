var cybers = new Firebase('https://cybers.firebaseio.com/');
var yesterday = new Date().getTime() - 8640000; // 8640000 ms == 1 day

window.onclick = function() {
  var data = {time: new Date().getTime()};
  cybers.push(data);
  console.log(data);
};

function renderCybers(n) {
  document.getElementById('cyber').innerHTML = n+' cybers today';
}

cybers.orderByChild('time').startAt(yesterday).on('value', function(snapshot) {
  renderCybers(snapshot.numChildren());
});

function login() {
  cybers.authWithOAuthPopup("github", function(error, authData) {

  });
}