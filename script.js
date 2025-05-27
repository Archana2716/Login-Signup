document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // SIGNUP FUNCTION
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("signupUsername").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const phone = document.getElementById("signupPhone").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("signupConfirmPassword").value;
      const profilePicInput = document.getElementById("signupProfilePic");

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (localStorage.getItem(username)) {
        alert("Username already exists!");
        return;
      }

      // Convert profile picture to base64
      const file = profilePicInput.files[0];
      const base64ProfilePic = await toBase64(file);

      const user = {
        username,
        email,
        phone,
        password,
        profilePic: base64ProfilePic,
      };

      localStorage.setItem(username, JSON.stringify(user));
      alert("Signup successful! You can now log in.");
      signupForm.reset();
    });
  }

  // LOGIN FUNCTION
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;

      const storedUser = localStorage.getItem(username);
      if (!storedUser) {
        alert("User not found!");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === password) {
        alert(`Welcome, ${username}!`);
        // Optionally redirect to a dashboard
      } else {
        alert("Incorrect password.");
      }
    });
  }
});

// Utility: Convert file to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
