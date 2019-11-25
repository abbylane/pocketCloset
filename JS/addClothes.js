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
;
function showContent(){
  var user = firebase.auth().currentUser;
  console.log(user);
  console.log(db.collection("closet"));
  db.collection('users').doc(user.uid).collection('closet').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
      var temp = document.getElementsByTagName("template")[0];
      var clon = temp.content.cloneNode(true);
    })
  });
  
  /*
  document.getElementById("cardColumns").appendChild(clon);
  for (i = 0; i < myArr.length; i++) {
    //Create a new node, based on the template:
    a = document.importNode(item, true);
    //Add data from the array:
    a.textContent += myArr[i];
    //append the new node wherever you like:
    document.body.appendChild(a);
  }
  */
}

