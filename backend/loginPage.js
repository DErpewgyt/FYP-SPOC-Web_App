function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Check if username and password meet the requirements
    if (username === "" || password === "") {
      alert("Username and password are required.");
      return false;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
  
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      alert("Password must contain at least one capital letter and one number.");
      return false;
    }
  }
  