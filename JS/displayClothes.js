var myClosetColumn = document.querySelector('#myClosetColumn');
const deleteClothingItemBtn = document.querySelector('#deleteClothingItemBtn');
const noDeleteClothingItemBtn = document.querySelector('#noDeleteClothingItemBtn');

// give each clothing card a unique html ID
var idCount = 0;
var cardID = "";

/* GET CURRENT USER INFO ON LOGIN */
auth.onAuthStateChanged(user =>{
  if(user){
    // User is signed in
    loadCloset(user);
  }
  else{
    // No user is signed in
    // sit and wait for user to sign in
  }
});

/* LOAD CLOTHING ITEMS FROM FIREBASE AND DISPLAY ON SCREEN */
function loadCloset(user){
  if(user){
    usersRef.doc(user.uid).collection('closet').onSnapshot(snapshot =>{

      var changes = snapshot.docChanges();
      changes.forEach(change => {
        if(change.type == 'added'){
          renderClothingItem(change.doc);
          console.log(myClosetColumn.querySelector("#this-delete"));
          console.log((document.querySelector("#this-delete")).onClick);
        }
        else if(change.type == 'removed'){
          //TODO: removed functionality
        }
      }); 
    });



  }

}

function deleteClothingItem(name){
  console.log("test1");
  deleteClothingItemBtn.onclick = function(){
    console.log("test2");
    var user = firebase.auth().currentUser;
    usersRef.doc(user.uid).collection('closet').doc(name).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
}

function renderClothingItem(doc){
  var name = doc.data().name;
  var url = doc.data().imageUrl;
  var type = doc.data().type;
  var categorty = getCategory(type);

  idCount += 1;   // increment card ID
  cardID = "card" + toString(idCount); 


  /*
  data-parameter based on clothing item name: 
    image: name-image
    add to outfit button: name-addToOutfit
    edit clothing item: name-editItem
    delete clothing item: name-deleteItem
  */

  myClosetColumn.innerHTML +=
  `
  <div class="${categorty} clothing-item-card card border-secondary mb-3 mb-3" style="max-width: 20rem;">
    <div class="card-header">${name}</div>
    <div class="card-body">
      <img data-parameter="${name}-image" class="card-img" src="${url}" alt="Card image">
    </div>
    
    <div align="right" class="p-2">
    <div class="btn-group" role="group">
        <!-- Add to outfit  -->
        <button data-name="${name}" data-parameter="${name}-addToOutfit" type="button" class="btn btn-outline-secondary" data-toggle="modal"
            data-target="#addClothingModal">+</button>
        <div class="btn-group" role="group">
            <button id="btnGroupDrop2" type="button"
                class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop2"
                x-placement="bottom-start"
                style="position: absolute; transform: translate3d(0px, 29px, 0px); top: 0px; left: 0px; will-change: transform;">

                <!-- Edit clothing item -->
                <button data-parameter="${name}-editItem" type="button" class="btn btn-sml mr-2 ml-2 mb-2" data-toggle="modal"
                    data-target="#editClothingItemModal">
                    Edit
                </button>

                <!-- Delete Clothing Item  -->
                <button data-parameter="${name}-deleteItem" type="button" class="btn btn-sml mr-2 ml-2 mb-2" data-toggle="modal"
                    data-target="#deleteClothingModal" id="${name}-delete">
                    Delete
                </button>

            </div>
        </div>
    </div>
</div>

  </div>`;

  console.log("added " + name + " to HTML");

  var namez = "#"+name+"-delete";
  console.log(namez);
  (document.querySelector(namez)).addEventListener('click', (e) => {
    console.log("test0");
    deleteClothingItem(name);
  });
}

function getCategory(type){
  if (type == 'longsleeve' || type == 'tshirt' || type == 'sweatshirt' || type == 'dress') return 'shirts';
  if (type == 'tennisShoes' || type == 'heels') return 'shoes'; 
  if (type == 'jeans') return 'pants';
  else return 'empty';
}

//TODO: have a filter for all
function filter(type){
  document.querySelectorAll('.clothing-item-card').forEach((card) => {
    if(card.classList.contains(type)){
      card.style.display = 'inline-block';
    }
    else{
      card.style.display = 'none';
    }
  });
}


