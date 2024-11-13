const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
// Handle login form submission
document.querySelector("#login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Example authentication logic
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Simulate a successful login for demonstration
    if (username && password) {
        sessionStorage.setItem("isAuthenticated", "true"); // Set authentication status

        // Redirect to Home.html after successful login
        window.location.href = "index.html";
    } else {
        alert("Please enter valid credentials.");
    }
});

