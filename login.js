import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "./firebase.js";

const auth = getAuth();
const provider = new GoogleAuthProvider(); 


const signInEmail = document.getElementById("login-email");
const signInPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const googleSignInBtn = document.getElementById("google-signin-btn");

loginBtn.addEventListener("click", () => {
  if (signInEmail.value.trim() && signInPassword.value.trim()) {
    signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
      .then((userCredential) => {
     
        const user = userCredential.user;

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Sign-In successfully",user,
            showConfirmButton: false,
            timer: 1500
          });



        setTimeout(() => {
          location.href = "profile.html";
        }, 2000);
      })
      .catch((error) => {
      
        console.error("Login Error:", error.message);
        alert(`Error: ${error.message}`); 
      });
  } else {
    console.log("Please fill in both email and password.");
    alert("Please fill in both email and password."); 
  }
});


googleSignInBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
   
      const user = result.user;


      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google Sign-In successfully" ,user,
        showConfirmButton: false,
        timer: 1500
      });


    
      setTimeout(() => {
        location.href = "profile.html";
      }, 2000);
    })
    .catch((error) => {
 
      console.error("Google Sign-In Error:", error.message);
      alert(`Google Sign-In Error: ${error.message}`); 
    });
});
