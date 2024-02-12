document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser);

    // Check if user is logged in
    if (loggedInUser) {
        // Populate HTML elements with user data
        document.getElementById('username').textContent = loggedInUser.username;
        document.getElementById('email').textContent = loggedInUser.email;
        document.getElementById('age').textContent = loggedInUser.age;
        document.getElementById('id').textContent = loggedInUser.id;
        document.getElementById('phone').textContent = loggedInUser.phone;
        document.getElementById('points').textContent = loggedInUser.points;
        
    } else {
        // Redirect to login page if user is not logged in
        window.location.href = "login.html";
    }
    
});

