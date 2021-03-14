const toggleList = document.querySelector('#toggleList');
const listDiv = document.querySelector('.list');
const textInput = document.querySelector('#addItemInput');
const addItemButton = document.querySelector('#addItem');
const purpleListUl = document.querySelector('#purpleList');
const lis = purpleListUl.children;


// Adds the buttons to each list item on initial page load
function attachListItemButtons(li, first, last){
  let up = document.createElement('button');
  up.className = 'up';
  up.textContent = 'Up';
  li.appendChild(up);
  let down = document.createElement('button');
  down.className = 'down';
  down.textContent = 'Down';
  li.appendChild(down);
  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);
}

//On page load, iterates through each row of the list and calls the function to add buttons
for (let i=0; i<lis.length; i++){
  let first = false;
  let last = false;
  if(i == 0){
    first = true;
  }
  if(i == lis.length-1){
    last = true;
  }
  attachListItemButtons(lis[i], first, last);
}

//To toggle the visibility of the up and down buttons if in the first or last row, respectively
function checkListItemButtons(li){
  for (let i=0; i<li.length; i++){
    let first = false;
    let last = false;
    if(i == 0){
      first = true;
    }
    if(i == li.length-1){
      last = true;
    }
    let item = li[i];
    
    if(first){
      let up = item.firstElementChild;
      up.className = 'off';
      up.style.background = 'white';
      up.style.borderColor ='rgba(0, 0, 0, 0)';
    } 
    if(!first){
      let up = item.firstElementChild;
      up.className = 'up';
      up.style.background = '#52bab3';
      up.style.borderColor ='rgba(0, 0, 0, .1)';
    }
    if(last){
      let down = item.firstElementChild.nextElementSibling;
      down.className = 'off';
      down.style.background = 'white';
      down.style.borderColor ='rgba(0, 0, 0, 0)';
    }
    if(!last){
      let down = item.firstElementChild.nextElementSibling;
      down.className = 'down';
      down.style.background = '#508abc';
      down.style.borderColor ='rgba(0, 0, 0, .1)';
    }
  }
}

//On page load, calls the function to toggle visibility of up and down buttons
checkListItemButtons(lis);

//Event handler for up, down, and remove buttons
purpleListUl.addEventListener('click', (event)=>{
  if(event.target.tagName == 'BUTTON'){
    if(event.target.className == 'remove'){
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
    
    if(event.target.className == 'up'){
      let li = event.target.parentNode;
      let ul = li.parentNode;
      let prevLi = li.previousElementSibling;
      let nextLi = li.nextElementSibling;
      if(prevLi){
        ul.insertBefore(li, prevLi);
      }
    }
    
    if(event.target.className == 'down'){
      let li = event.target.parentNode;
      let ul = li.parentNode;
      let nextLi = li.nextElementSibling;
      if (nextLi){
        ul.insertBefore(nextLi, li);
      } 
    }
    
    checkListItemButtons(lis);
  }
});

//Event handler to toggle the visibility of the list of purple items
toggleList.addEventListener('click', () => {
  if(listDiv.style.display == 'none'){
   toggleList.textContent = 'Hide List';
   listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  }
});

//Event handler to add items to the list of purple items
addItemButton.addEventListener('click', () => {
  let li = document.createElement('li');
  li.textContent = textInput.value;
  attachListItemButtons(li);
  purpleListUl.appendChild(li);
  textInput.value = '';

  checkListItemButtons(lis);
});