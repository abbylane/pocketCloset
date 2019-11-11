/* Logout functionality */
const logoutLink = document.querySelector('#logout-link');

logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "login.html";
});