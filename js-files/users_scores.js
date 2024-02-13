

// Function to retrieve all users from localStorage and display them in a table sorted by points
function displayAllUsers() {
    const users = getUsersSortedByPoints();
    const tableBody = document.getElementById('usersTableBody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Populate table with users
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.id}</td>
            <td>${user.phone}</td>
            <td>${user.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

function getUsersSortedByPoints() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = [];
    let loggedInUserAdded = false; // Flag to track if the logged-in user has been added

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'username' && key !== 'password') {
            const user = JSON.parse(localStorage.getItem(key));
            // Check if the user is the same as the logged-in user
            if (user.username === loggedInUser.username) {
                // Check if the logged-in user has already been added
                if (!loggedInUserAdded) {
                    users.push(user);
                    loggedInUserAdded = true;
                }
            } else {
                users.push(user);
            }
        }
    }
    users.sort((a, b) => b.points - a.points); // Sort by points in descending order
    return users;
}



// Call the function to display all users when the page loads
displayAllUsers();
