// Function to handle user signup
async function handleSignup(username, password) {
    try {
      const response = await fetch('https://65708bf009586eff66419795.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (response.ok) {
        const userData = await response.json(); // Retrieve the user data including the ID
        const userId = userData.id; // Assuming your response contains the user ID

        // Store user ID in session storage
        sessionStorage.setItem('userId', userId);
        // Signup successful - redirect to login page or perform other actions
        window.location.href = 'index.html';
      } else {
        // Handle signup error
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle other errors, such as network issues
      alert('Signup failed. Please check your network connection.');
    }
  }
  
  // Handle form submission
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
  
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      await handleSignup(username, password);
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please check your network connection.');
    }
  });
