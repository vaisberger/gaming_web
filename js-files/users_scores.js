

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

// Function to retrieve all users from localStorage and sort them by points
function getUsersSortedByPoints() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'username' && key !== 'password') {
            const user = JSON.parse(localStorage.getItem(key));
            users.push(user);
        }
    }
    users.sort((a, b) => b.points - a.points); // Sort by points in descending order
    return users;
}

// Call the function to display all users when the page loads
displayAllUsers();
