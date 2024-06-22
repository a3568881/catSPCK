function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = localStorage.getItem("info");
    var data = JSON.parse(user);
    if ( user == null){
        alert("Please register an account")
    }
    else if (email == data.email && password==data.password){
        alert("Login Success")
        window.location.href = "home.html"
    }
    else {
        alert("Login failed")
    }
    return false; 
}