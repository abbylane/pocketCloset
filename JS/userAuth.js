// Constants
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

/*Check if user is logged in 
and bring them to home page if so*/
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    // User is signed in

    // TODO: will need to fix this later
    setTimeout(function(){ window.location.href = "index.html"; }, 500);

    //window.location.href = "index.html";
    console.log('success');
  }
  else{
    // No user is signed in
    // Sit and wait for user to sign in
  }
});

/* Login user with email and password */
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      
      window.alert("Error : " + errorMessage);
    });
  });
}

/* Signup user with email, password, and name */
if(signupForm){
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const name = signupForm['signup-name'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      db.collection('users').doc(cred.user.uid).set({
        name: name,
        email: email,
        uid: cred.user.uid
      });
    });
  });
}

