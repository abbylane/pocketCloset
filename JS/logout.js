/* Logout functionality */
const logoutLink = document.querySelector('#logout-link');
const logoutButton = document.querySelector('#logout-button');


logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "login.html";
});

logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "login.html";
});


