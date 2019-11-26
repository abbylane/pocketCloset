const myClosetColumn = document.querySelector('#myClosetColumn');

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
        }
        else if(change.type == 'removed'){
          //TODO: removed functionality
        }
      }); 
    });
  }
}

function renderClothingItem(doc){
  var name = doc.data().name;
  var url = doc.data().imageUrl;
  var type = doc.data().type;
  var categorty = getCategory(type);

  myClosetColumn.innerHTML +=
  `
  <div class="${categorty} clothing-item-card card border-secondary mb-3 mb-3" style="max-width: 20rem;">
    <div class="card-header">${name}</div>
    <div class="card-body">
      <img class="card-img" src="${url}" alt="Card image">
    </div>
  </div>`;
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
      card.style.display = 'block';
    }
    else{
      card.style.display = 'none';
    }
  });

}