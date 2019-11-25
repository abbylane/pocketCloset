// Constants
const usersRef = db.collection('users');
const clothingNameInput = document.querySelector('#clothingNameInput');
const typeSelect = document.querySelector('#typeSelect');
const colorSelect = document.querySelector('#colorSelect');
const notesTextArea = document.querySelector('#notesTextArea');
const clothingPhotoInput = document.querySelector('#clothingPhotoInput');
const addClothingItemBtn = document.querySelector('#addClothingItemBtn');

// Add clothing item to database on submit
addClothingItemBtn.onclick = function(){
  var user = firebase.auth().currentUser;

  var itemName = clothingNameInput.value;

  var file = clothingPhotoInput.files[0];
  var fileName = new Date() + '-' + file.name;
  var metadata = {contentType: file.type};
  var uploadTask = firebase.storage().ref().child('images/'+fileName).put(file, metadata);

  uploadTask.on('state_changed', function (snapshot) {
    var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log('upload is ' + progress + ' done');
  }, function (error) {
      console.log(error.message);
  }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
        usersRef.doc(user.uid).collection('closet').doc(itemName).set({
          name: itemName,
          type: typeSelect.options[typeSelect.selectedIndex].value,
          color: colorSelect.options[colorSelect.selectedIndex].value,
          notes: notesTextArea.value,
          imageUrl: url
        }, { merge: true });
      });
  }
  
  );

  
}

