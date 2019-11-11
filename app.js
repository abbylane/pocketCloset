const clothingList = document.querySelector('#clothing-list');

// create element & render cafe
function renderCloset(doc){

    let li = document.createElement('li');
    let color = document.createElement('span');
    let type = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    color.textContent = doc.data().closet.clothingItem01.color; 
    type.textContent = doc.data().closet.clothingItem01.type; 

    li.appendChild(color);
    li.appendChild(type);

    clothingList.appendChild(li);
}

// getting data
db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        // renderCloset(doc);
    });
});


// ----- Add Clothes Modal and Button -------
// var addClothesmodal = document.getElementById("addClothesModal");
// var addClothesButton = document.getElementById("addClothesButton");

// var span = document.getElementsByClassName("close")[0];

// // when the user clicks on the button, open the modal
// addClothesButton.onclick = function() {
//   addClothesmodal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   addClothesmodal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == addClothesmodal) {
//     addClothesmodal.style.display = "none";
//   }
// }

