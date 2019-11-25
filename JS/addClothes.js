// Constants
const usersRef = db.collection('users');
const typeSelect = document.querySelector('#typeSelect');
const colorSelect = document.querySelector('#colorSelect');
const notesTextArea = document.querySelector('#notesTextArea');
const addClothingItemBtn = document.querySelector('#addClothingItemBtn');
const clothingName = document.querySelector('#newClothingName'); 

// TODO: firebase storage for image uploading  
var storageRef = firebase.storage().ref();  // root reference
var imageRef = storageRef.child('test.jpg');  // reference to uploaded image 

let fileName = ""

var tempImagesRef = storageRef.child(`images/${fileName}`);

imageRef.name == tempImagesRef.name; 
imageRef.fullPath == tempImagesRef.fullPath; 


// Add clothing item to database on submit
addClothingItemBtn.onclick = function(){
  var user = firebase.auth().currentUser;

  usersRef.doc(user.uid).collection('closet').doc(clothingName.value).set({
    name: clothingName.value, 
    type: typeSelect.options[typeSelect.selectedIndex].value,
    color: colorSelect.options[colorSelect.selectedIndex].value,
    notes: notesTextArea.value
  }, { merge: true });
}
;
function showContent(type){
  var user = firebase.auth().currentUser;
  console.log(user);
  console.log(db.collection("closet"));
  cards = document.getElementById("cardColumns");
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  db.collection('users').doc(user.uid).collection('closet').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
      if(doc.data().type=='jeans' && type =='pants'){
        var temp = document.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        document.getElementById("cardColumns").appendChild(clon);
      }

      if((doc.data().type=='longsleeve' || doc.data().type=='t-shirt' || doc.data().type=='sweatshirt' || doc.data().type=='dress') && type =='shirts'){
        var temp = document.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        document.getElementById("cardColumns").appendChild(clon);
      }

      if((doc.data().type=='tennisshoes' || doc.data().type=='heels') && type =='shoes'){
        var temp = document.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        document.getElementById("cardColumns").appendChild(clon);
      }
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

