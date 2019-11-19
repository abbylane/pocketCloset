/* Account Editing functionality */
const deleteButton = document.querySelector('#delete-button');
const currentPassword = document.querySelector('#current-password');
const newPassword = document.querySelector('#new-password');
const newEmail = document.querySelector('#new-email');
const changeAccount = document.querySelector('#accountSettingsModal');
const saveAccount = document.querySelector('#saveAccount-button');

/* Delete User */
if(deleteButton){
  deleteButton.addEventListener('click', (e) => {

    console.log("Deleting User");
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword.value);
        user.reauthenticateAndRetrieveDataWithCredential(cred);
    user.delete().then(function() {
      console.log("User Deleted!")
      window.location.href = "login.html";
    }).catch(function(error) {
      console.log(error);
    });
});
}

/* Save Account Information */
if(saveAccount){
  saveAccount.addEventListener('click', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    console.log("try");
    console.log(newPassword.value);
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword.value);
    user.reauthenticateAndRetrieveDataWithCredential(cred);
    if(newPassword.value != ''){
      console.log("Updating Password");
      user.updatePassword(newPassword.value).then(() => {
        window.location.href = "index_v02.html";
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }

    if(newEmail.value != ''){
      console.log("Updating Email");
      user.updateEmail(newEmail.value).then(() => {
        window.location.href = "index_v02.html";
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }

  });
}