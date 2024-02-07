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


        
    } else {
        alert('Invalid username or password');
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

        displayRegisteredPeople(); // Call function to update the list

        // Optionally, you can also display an alert with the new user's details
        alert(`New user registered:\nUsername: ${newUser.username}\nID: ${newUser.id}\nPhone: ${newUser.phone}`);
}
}

function displayRegisteredPeople() {
    const registeredPeopleList = document.getElementById('registeredPeople');
    registeredPeopleList.innerHTML = ''; // Clear the list before updating

    // Loop through local storage and display each registered person
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'username' && key !== 'password') { // Skip internal keys
            const user = JSON.parse(localStorage.getItem(key));
            const listItem = document.createElement('li');
            listItem.textContent = `Username: ${user.username}, id: ${user.id}, Phone: ${user.phone},Points : ${user.points}`;
            registeredPeopleList.appendChild(listItem);
        }
    }
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
displayRegisteredPeople();