function do_the_thing() {
  var cybers = new Firebase('https://cybers.firebaseio.com/');
  var yesterday = new Date().getTime() - 8640000; // 8640000 ms == 1 day

  function addCyber() {
    var data = {time: new Date().getTime()};
    cybers.push(data, function(error) {
      if (error) alert("nice try bud");
    });
    console.log(data);
  }

  function renderCybers(n) {
    document.getElementById('cybers').innerHTML = n + (n==1?' cyber':' cybers') + ' today';
  }

  function authCallback(authData) {
    if (authData === null) return;
    console.log("user logged in!");
    console.log(authData);
    window.onclick = addCyber;
    document.body.className = "logged-in";
  }

  cybers.orderByChild('time').startAt(yesterday).on('value', function(snapshot) {
    renderCybers(snapshot.numChildren());
  });

  cybers.onAuth(authCallback);

  window.login = function() {
    console.log("attempting login");
    cybers.authWithOAuthRedirect("github", function(authData) {

    });
  };

  window.logout = function() {
    console.log("bye");
    cybers.unauth();
    document.body.className = "logged-out";
  };
}

document.addEventListener('DOMContentLoaded', function(){
  do_the_thing();
});