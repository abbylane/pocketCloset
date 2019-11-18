// Constants
const usersRef = db.collection('users');
const typeSelect = document.querySelector('#typeSelect');
const colorSelect = document.querySelector('#colorSelect');
const notesTextArea = document.querySelector('#notesTextArea');
const addClothingItemBtn = document.querySelector('#addClothingItemBtn');

// Add clothing item to database on submit
addClothingItemBtn.onclick = function(){
  var user = firebase.auth().currentUser;

  // Todo: change this to name provided by user
  var itemName = colorSelect.options[colorSelect.selectedIndex].value + typeSelect.options[typeSelect.selectedIndex].value;

  usersRef.doc(user.uid).collection('closet').doc(itemName).set({
    type: typeSelect.options[typeSelect.selectedIndex].value,
    color: colorSelect.options[colorSelect.selectedIndex].value,
    notes: notesTextArea.value
  }, { merge: true });
}

