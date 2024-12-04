import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";



const auth = getAuth();

let signUpBtn =document.getElementById("signup-btn")
let signupEmail = document.getElementById("signup-email");
let signupPassword = document.getElementById("signup-password");

if (signUpBtn) {
  console.log("Signup button found"); 

  signUpBtn.addEventListener("click", () => {
    console.log("Signup button clicked");


    if (signupEmail.value.trim() && signupPassword.value.trim()) {
      createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
        .then((userCredential) => {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500
              });

          const user = userCredential.user;
          console.log(user);

         
          setTimeout(() => {
            location.href = "login.html";
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);


        
          if (errorCode === "auth/email-already-in-use") {
            console.log("Use another email.");
          }
        });
    } else {
      console.log("Please enter your data.");
    }
  });
} else {
  console.error("Signup button not found in DOM");
}
