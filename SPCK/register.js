function register() {
    var email_infomation = document.getElementById("email").value;
    var password_infomation  = document.getElementById("password").value;
    var user = {
        email : email_infomation ,
        password : password_infomation,
    }
    var json = JSON.stringify(user);
    localStorage.setItem("info", json);
    alert ("Register Success");
    return false;
}
