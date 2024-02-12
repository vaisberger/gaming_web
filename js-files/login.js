var tries=0;
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Check if user exists and password matches
    const savedUser = JSON.parse(localStorage.getItem(username));
    if (savedUser && savedUser.password === password) {
        alert('Login successful!');
     // Save the logged-in user's data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(savedUser));
        window.parent.location.href = "home_page.html"; 
        creatCookie("user-name",username,"password",password);  
    } else if(tries<4){
        alert('Invalid username or password');
        tries+=1;
    }else{
    document.getElementById("log").src="blocked.html"
    }
}

function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const id = document.getElementById('id').value;
    const phone = document.getElementById('phone').value;
    const points= 0;



    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate age
    if (isNaN(age) || age < 0) {
        alert('Please enter a valid age ');
        return;
    }

    // Check if username already exists
    if (localStorage.getItem(newUsername)) {
        alert('Username already exists. Please choose a different one.');
    } else {
        // Save new user data
        const newUser = {
            username: newUsername,
            password: newPassword,
            email: email,
            age: age,
            id: id,
            phone: phone,
            points: points,

        };
        localStorage.setItem(newUsername, JSON.stringify(newUser));
        alert('Registration successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        window.parent.location.href = "home_page.html";
        creatCookie("user-name",newUsername,"password",newPassword);
        getUsersSortedByPoints(); // Call function to update the list

        // Optionally, you can also display an alert with the new user's details
        alert(`New user registered:\nUsername: ${newUser.username}\nID: ${newUser.id}\nPhone: ${newUser.phone}`);
}
}

function creatCookie(cname, cvalue,cpass,code) {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
       let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";"+cpass+"=" +code+";" + expires + ";path=/html-files/main.html"; 
        alert("Welcome " + cvalue);
}

    function checkCookie(){
    let user = getCookie("user-name");
    if (user != "") {
      document.getElementById("log").contentWindow
      .document.getElementById('username').value=user; // setting the username from cookie
      document.getElementById("log").contentWindow
      .document.getElementById('password').value=JSON.parse(localStorage.getItem('loggedInUser')).password;
      alert("Welcome again " + user)
      window.parent.location.href = "home_page.html";
    } else {
      alert("please enter your login info")
    }
}
function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";

}

function getUsersSortedByPoints() {
    const users = [];
    // Loop through local storage and push each user to the array
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'username' && key !== 'password') { // Skip internal keys
            const user = JSON.parse(localStorage.getItem(key));
            users.push(user);
        }
    }
    // Sort the array by points (descending order)
    users.sort((a, b) => b.points - a.points);
    return users;
}
// Function to toggle password visibility
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Call the function once when the page loads to display existing registered people
getUsersSortedByPoints();

function generateUsersTable(users) {
    const table = document.createElement('table');
    // Create table header
    const headerRow = table.insertRow();
    headerRow.innerHTML = '<th>Username</th><th>ID</th><th>Phone</th><th>Points</th>';
    // Create table rows for each user
    users.forEach(user => {
        const row = table.insertRow();
        row.innerHTML = `<td>${user.username}</td><td>${user.id}</td><td>${user.phone}</td><td>${user.points}</td>`;
    });
    return table;
}
function displayRegisteredPeople() {
    // Get sorted users array
    const users = getUsersSortedByPoints();
    // Generate table HTML
    const table = generateUsersTable(users);
    // Display the table on the new page
    document.body.appendChild(table);
}
