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
