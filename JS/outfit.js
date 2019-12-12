var user = firebase.auth().currentUser;

// get images for 3 outfit cards
const image1 = document.querySelector('#outfit-image-1');
const image2 = document.querySelector('#outfit-image-2');
const image3 = document.querySelector('#outfit-image-3');
const image4 = document.querySelector('#outfit-image-4');

// variables
// const usersRef = db.collection('users');
const addToOutfitBtn = document.querySelector('#addToOutfitBtn');
var existingoutfitselectModal = document.querySelector('#addOutfitSelect');
var viewOutfitSelect = document.querySelector("#viewOutfitSelect");
var newOutfitName = '';
var selectedOutfit = '';
var button = null;
var clothingItemName = null;
var currOutfit = viewOutfitSelect.value;
var viewOutfitButton = document.querySelector('#viewOutfitBtn');

auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        currUID = user.uid;
        displayOutfitSelect(currUID);
    }
    else {
        // No user is signed in
        // sit and wait for user to sign in
    }
});

// Get specific clothing item on '+' button click 
$('#addClothingModal').on('show.bs.modal', function (event) {
    user = firebase.auth().currentUser;

    console.log("in modal function");
    button = $(event.relatedTarget) // Button that triggered the modal
    clothingItemName = button.data('name')
    var modal = $(this)

    modal.find('.modal-title').text('Add ' + clothingItemName + ' to outfit')

    // handler for "Go" button 
    addToOutfitBtn.onclick = function (event) {
        console.log("GO clicked");

        newOutfitName = document.querySelector('#newOutfitName').value;
        selectedOutfit = existingoutfitselectModal.value;

        console.log("adding " + clothingItemName + " to outfit " + newOutfitName);
        console.log("Selected outfit is: " + selectedOutfit);

        if (newOutfitName) { // create a new outfit with selected clothing item
            createOutfit(clothingItemName, newOutfitName);
            viewOutfitSelect.innerHTML += `<option value="${newOutfitName}">${newOutfitName}</option>`
        }
        else if (selectedOutfit) { // add clothing item to existing outfit
            updateOutfitAdd(clothingItemName, selectedOutfit);
        }
    }
})

// update the outfit when a clothing item is added/ when new outfit is created
function createOutfit(item, outfit) {
    db.collection('users').doc(user.uid).collection('outfits').doc(outfit).set({
        name: outfit,
        items: [item]
    }, { merge: true });
}

// add a clothing item to an outfit
function updateOutfitAdd(item, outfit) {
    var currOutfit = db.collection('users').doc(user.uid).collection('outfits').doc(outfit);

    currOutfit.update({
        items: firebase.firestore.FieldValue.arrayUnion(item)
    })
}

// TODO: remove a clothing item from an outfit
function updateOutfitRemove(item, outfit) {
    // washingtonRef.update({
    //     regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
    // });
}

// Displays all current outfits in 'select'
function displayOutfitSelect(uid) {
    db.collection("users").doc(uid).collection("outfits").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            viewOutfitSelect.innerHTML += `<option value="${doc.data().name}">${doc.data().name}</option>`;
            existingoutfitselectModal.innerHTML += `<option value="${doc.data().name}">${doc.data().name}</option>`;
        });
    });
}

 // TODO: display selected outfit 
// viewOutfitButton.onclick = function displayOutfitCards(currUID) {

//     var closet = db.collection("users").doc(currUID).collection("closet");

//     // loop through all clothing items
//     closet.get().then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {

//             console.log(doc.id, " => ", doc.data().name);

//         });
//     });
// }


