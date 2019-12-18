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
viewOutfitButton.onclick = function displayOutfitCards() {

    var id = firebase.auth().currentUser.uid;
    var outfit = viewOutfitSelect.value;
    var outfitArray = '';

    var closet = db.collection("users").doc(id).collection("closet");
    var outfits = db.collection("users").doc(id).collection("outfits");

    // get outfit database item
    var outfitDocRef = outfits.doc(outfit);

    outfitDocRef.get().then(function (doc) {
        if (doc.exists) {
            outfitArray = doc.data().items;
            console.log(outfitArray);

            for (var i = 0; i < outfitArray.length; i++) {
                console.log(outfitArray[i]);
                createItemCard(closet, outfitArray[i]);
            }

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function createItemCard(closet, item) {
    // TODO: display items from outfit array
    var currentOutfitCards = document.querySelector('#currentOutfitCards');
    currentOutfitCards.innerHTML = '';

    var clothingRef = closet.doc(item);
    var name = '';
    var src = '';

    clothingRef.get().then(function (doc) {
        if (doc.exists) {

            name = doc.data().name;
            src = doc.data().imageUrl; 

            currentOutfitCards.innerHTML +=                     
            `<div class="card border-secondary p-5 mb-4">
                <div class="card-body">
                    <img id="${name}-outfitCard" class="card-img" src="${src}" alt="Card image">
                </div>
            </div>`
        ;

        } else {
            console.log("no such document");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}


