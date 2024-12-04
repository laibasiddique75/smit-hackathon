import {getAuth, sendEmailVerification, signOut } from "./firebase.js";


// Get the button by its ID
const postButton = document.getElementById('post');

// Add a click event listener
postButton.addEventListener('click', function () {
  // Redirect to the profile page
  window.location.href = 'post.html'; // Replace with the actual URL of your profile page
});



// verify with email
let emailVerify = document.getElementById("btn-EmailVerify");
emailVerify.addEventListener("click", ()=>{
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Swal.fire({
            icon: "success",
            title: "Email has been sent!",
            text: "Verify with your email"
        });
      });
    
});





// sign out
const auth = getAuth();
let logOut = document.getElementById("btn-logout");
logOut.addEventListener("click", ()=>{
    signOut(auth).then(() => {
        console.log("user has been signed out");

        const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Sign out successfully"
        });


        setTimeout(() => {
            location.href = "signup.html"
        }, 2000)

    
        
      }).catch((error) => {
        console.log(error);
        
      });
})