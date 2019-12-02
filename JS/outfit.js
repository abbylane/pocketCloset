
// get images for 3 outfit cards
const image1 = document.querySelector('#outfit-image-1');
const image2 = document.querySelector('#outfit-image-2');
const image3 = document.querySelector('#outfit-image-3');
const image4 = document.querySelector('#outfit-image-4');

// variables
const usersRef = db.collection('users');
const addToOutfitBtn = document.querySelector('#addToOutfitBtn');
const outfitSelect = document.querySelector('#addOutfitSelect');
const newOutfitName = document.querySelector('#newOutfitName');

// add clothing item to new outfit -- new outfit name


// add clothing item to existing outfit

// function to display outfit ? 

// TODO: get outfit by name
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})


// usersRef.doc(user.uid).collection('closet').doc(itemName).set({
//     name: itemName,
//     type: typeSelect.options[typeSelect.selectedIndex].value,
//     color: colorSelect.options[colorSelect.selectedIndex].value,
//     notes: notesTextArea.value,
//     imageUrl: url
// }, { merge: true });