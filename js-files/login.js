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
    } else if(tries<2){
        alert('Invalid username or password');
        tries+=1;
    }else{
       alert('You tried to login too many times you are blocked for 1 min');
       setTimeout(()=> {
        tries=0;
        login();
      }, 1000*60);
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
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));// אולי שיהיה שמור בזה רק השם של הקי שמחזיק את פרטי המשתמש הנוכחי ?
        window.parent.location.href = "home_page.html";
        creatCookie("user-name",newUsername,"password",newPassword);
        getUsersSortedByPoints(); // Call function to update the list

        // Optionally, you can also display an alert with the new user's details
        alert(`New user registered:\nUsername: ${newUser.username}\nID: ${newUser.id}\nPhone: ${newUser.phone}`);
}
}

//creats a new cookie when the user logsin or registers
function creatCookie(cname, cvalue,cpass,code) {
        const d = new Date();
        d.setTime(d.getTime() + (1000*60*60));
       let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";"+cpass+"=" +code+";" + expires + ";path=/html-files/main.html"; 
        alert("Welcome " + cvalue);
}

// a function to check if cookie still exictes 
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

// get a cookies if there is one by name
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

