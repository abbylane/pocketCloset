var user = firebase.auth().currentUser;

// get images for 3 outfit cards
const image1 = document.querySelector('#outfit-image-1');
const image2 = document.querySelector('#outfit-image-2');
const image3 = document.querySelector('#outfit-image-3');
const image4 = document.querySelector('#outfit-image-4');

// variables
// const usersRef = db.collection('users');
const addToOutfitBtn = document.querySelector('#addToOutfitBtn');
var outfitSelect = document.querySelector('#addOutfitSelect');
var newOutfitName = '';
var selectedOutfit = ''; 
var button = null;
var clothingItemName = null;

// add clothing item to new outfit -- new outfit name


// add clothing item to existing outfit

// Get specific clothing item on '+' button click 
$('#addClothingModal').on('show.bs.modal', function (event) {
    user = firebase.auth().currentUser;

    console.log("in modal function");
    button = $(event.relatedTarget) // Button that triggered the modal
    clothingItemName = button.data('name') 
    var modal = $(this)

    modal.find('.modal-title').text('Add ' + clothingItemName + ' to outfit')

    // handler for "Go" button 
    addToOutfitBtn.onclick = function(event){
        console.log("GO clicked");
       
        newOutfitName = document.querySelector('#newOutfitName').value; 
        selectedOutfit = outfitSelect.value;

        console.log("adding " + clothingItemName + " to outfit " + newOutfitName);
        console.log("Selected outfit is: " + selectedOutfit);

        if(newOutfitName){
            updateOutfit(clothingItemName, newOutfitName);
            updateOutfitSelect(newOutfitName);
        } 
        else if (selectedOutfit){
            //updateOutfit(clothingItemName, selectedOutfit);
        }
    }
})

// update the outfit when a clothing item is added/ when new outfit is created
function updateOutfit(item, outfit){
    console.log("In create outfit function");
    console.log("Item: " + item);
    console.log("Outfit: " + outfit);

    // Update database
    db.collection('users').doc(user.uid).collection('outfits').doc(outfit).set({
        name: outfit, 
        item1: item
    }, { merge: true });
    console.log("Created outfit");
}

// function to update the select
function updateOutfitSelect(outfit){
    var viewOutfitSelect = document.querySelector("#viewOutfitSelect");
    viewOutfitSelect.innerHTML += `<option value="${outfit}">${outfit}</option>`
}

// TODO: Displays all current outfits in 'select'
function displayOutfitSelect(){
    console.log("In update outfits select function");
    
    db.collection("users").doc(user.uid).collection("outfits").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().name);
            viewOutfitSelect.innerHTML += `<option value="${doc.data().name}">${doc.data().name}</option>`
        });
    });
}
