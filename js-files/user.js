document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser);
    var name=loggedInUser.username;
    const user= JSON.parse(localStorage.getItem(name));
    // Check if user is logged in
    if (loggedInUser) {
        // Populate HTML elements with user data
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        document.getElementById('age').textContent = user.age;
        document.getElementById('id').textContent = user.id;
        document.getElementById('phone').textContent = user.phone;
        document.getElementById('points').textContent = user.points;
        
    } else {
        // Redirect to login page if user is not logged in
        window.location.href = "login.html";
    }
    
});

