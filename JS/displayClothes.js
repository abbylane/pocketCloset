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


function deleteClothingItem(obj){
  var name = obj.getAttribute('data-parameter');
  console.log("test1");
  deleteClothingItemBtn.onclick = function(){
    console.log("test2");
    var user = firebase.auth().currentUser;
    usersRef.doc(user.uid).collection('closet').doc(name).delete().then(function() {
        console.log(name + "Document successfully deleted!");
        if(document.querySelector("#"+name + "-card") != null){
          (document.querySelector("#"+name + "-card")).remove();
        }
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
}

/* LOAD CLOTHING ITEMS FROM FIREBASE AND DISPLAY ON SCREEN */
function loadCloset(user){
  if(user){
    usersRef.doc(user.uid).collection('closet').onSnapshot(snapshot =>{
      var changes = snapshot.docChanges();
      changes.forEach(change => {
        if(change.type == 'added'){
          renderClothingItem(change.doc, user.uid);
        }
        else if(change.type == 'removed'){
          if(document.querySelector("#"+change.doc.data().name + "-card") != null){
            (document.querySelector("#"+change.doc.data().name + "-card")).remove();
          }
        }
      }); 
    });
  }
}

async function renderClothingItem(doc, uid){
  var name = doc.data().name;
  var url = doc.data().imageUrl;
  var type = doc.data().type;
  var color = doc.data().color;
  var categorty = getCategory(type);

  var matchingItemsList = ``;

  idCount += 1;   // increment card ID
  cardID = "card" + toString(idCount); 

  /* Initialize popovers */
  $(function () {
    $('[data-toggle="popover"]').popover()
  })

  /* close popovers when clicking elsewhere */
  $('html').on('click', function(e) {
    if (typeof $(e.target).data('original-title') == 'undefined' &&
       !$(e.target).parents().is('.popover.in')) {
      $('[data-original-title]').popover('hide');
    }
  });

  /* Get matching items */
  await usersRef.doc(uid).collection('closet').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(colorsMatch(color, doc.data().color) && categorty != getCategory(doc.data().type)){
        matchingItemsList += `<li>${doc.data().name}</li>`;
      }
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });

  myClosetColumn.innerHTML +=
  `
  <div class="${categorty} clothing-item-card card border-secondary mb-3 mb-3" style="max-width: 20rem;" id="${name}-card">
    <div class="card-header">${name}</div>
    <div class="card-body tltp">
      <img class="card-img" src="${url}" alt="Card image">
      <div class="tooltiptext">
        <p>Items that pair well:</p>
        <ul>
          ${matchingItemsList}
        </ul>
      </div>
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
                <button data-parameter="${name}" type="button" class="btn btn-sml mr-2 ml-2 mb-2" data-toggle="modal"
                    data-target="#deleteClothingModal" id="${name}-delete" onclick="deleteClothingItem(this)">
                    Delete
                </button>

            </div>
        </div>
    </div>
</div>`;
}

/*
TODO: implement more clothing categories

Current type options and categories:
  Pants: pants, jeans, leggings
  Shirts: tshirt, longsleeve, sweatshirt, sweater, dress
  Shoes: tennisShoes, heels
  Accessories: baseballHat, winterHat, gloves
  Other: winterCoat
*/

function getCategory(type){
  if (type == 'jeans' || type == 'pants' || type == 'leggings') return 'pants';
  if (type == 'longsleeve' || type == 'tshirt' || type == 'sweatshirt' || type == 'sweater' || type == 'dress') return 'shirts';
  if (type == 'tennisShoes' || type == 'heels') return 'shoes'; 
  if (type == 'baseballHat' || type == 'winterHat' || type == 'gloves') return 'accessories'; 
  if (type == 'winterCoat') return 'other';
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

// display all cards, no filter
function filterAll(){
  document.querySelectorAll('.clothing-item-card').forEach((card) => {
      card.style.display = 'inline-block';
  });
}

function colorsMatch(color1, color2){
  var colorPairs = {
    'red': ['blue', 'gray', 'white', 'black'],
    'orange': ['green', 'blue', 'white', 'black'],
    'yellow': ['green', 'blue', 'white', 'black'],
    'green': ['orange', 'white', 'black'],
    'blue': ['red', 'yellow', 'gray', 'white', 'black'],
    'white': ['blue', 'black', 'gray'],
    'black': ['red', 'orange', 'yellow', 'green', 'blue', 'white', 'gray'],
    'gray': ['red', 'blue'],
  }

  if(colorPairs[color1].indexOf(color2) >=0) return true;
  return false;
}


