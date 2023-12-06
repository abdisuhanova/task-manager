// Function to handle login using MockAPI.io
async function handleLogin(username, password) {
    try {
      const response = await fetch('https://65708bf009586eff66419795.mockapi.io/users?username=' + username + '&password=' + password);
  
      if (response.ok) {
        const user = await response.json();
        if (user.length > 0) {
          // Successful login - store user data in session storage
          sessionStorage.setItem('loggedInUser', JSON.stringify(user[0]));
          window.location.replace('index.html'); // Redirect to the task manager page
        } else {
          alert('Invalid username or password. Please try again.');
        }
      } else {
        // Handle other response statuses (e.g., 404, 500)
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors or other exceptions
      alert('Login failed. Please check your network connection.');
    }
  }
  
  // Function to handle logout
  function handleLogout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.replace('login.html'); // Redirect to the login page
  }
  
  // Function to check if a user is logged in
  function checkLoggedIn() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      window.location.replace('login.html'); // Redirect to login if not logged in
    }
  }
  
  // Sample usage in login page (login.html)
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    handleLogin(username, password);
  });
  
  // Sample usage in logout button (index.html)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      handleLogout();
    });
  }
  
  // Sample usage to check if user is logged in (index.html)
  checkLoggedIn();
  