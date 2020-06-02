var listToDisplay;
var favList=[];
var favListID = [];
var homeButton = document.getElementById('home');
var visitFavButton = document.getElementById('fav');
var searchInput = document.getElementById('search');

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


dynamicEventSetter();
function getCookie() {
		var cname = 'name';
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return "";
  }
function setCookie(){
		//console.log(JSON.stringify(favListID));
    document.cookie = `name=${JSON.stringify(favListID)};expires= Thu, 30 June 2020 02:40:00 UTC; path=/`;
    // document.cookie = "name=akash;expires=Thu, 2 June 2020 02:40:00 UTC;path=/";
    //console.log(getCookie('name'));
    //console.log(document.cookie);
}

function dynamicEventSetter(){
   //Set event for all cards displayed
   var allCards = document.querySelectorAll('.img-card img');
   for(let each of allCards){
    //    console.log(each.parentElement);
       each.addEventListener('click', function(){
        //    console.log(each.parentElement.id);
            fetchSuperHeroesByID(each.parentElement.id);
       });
   }
   //Set events for all favourite buttons
   var favButtons = document.getElementsByClassName('favrt-icon');
   for(let each of favButtons){
       each.addEventListener('click', function(){
            console.log(each.style.color);
            if (each.style.color === 'red'){
                each.style.color = 'white';
                removeFromFavourite(each.parentElement);
            }
            else{
            each.style.color = 'red';
            storeSuperHeroesToFavourite(each.parentElement);
            }
       });
   }
}
//To display all the fetched images
function showSuperHeroes(superHeroList){
    // superHeroList = superHeroData
    // console.log(superHeroList);
    // console.log(Object.keys(superHeroList[0].biography));
    $('.all-img-container').empty();
    for(each of superHeroList){
        let newCard=newCardDom(each);
        // console.log(newCard[0].id);
        if(favListID.includes(newCard[0].id)){
            newCard[0].children[0].style.color = 'red';
        }
        $('.all-img-container').append(newCard);
    }
    dynamicEventSetter();
    return;
}
//To create new promises for each url
function getSuperHerosById(url){
    return new Promise((resolve, reject) =>{
        fetch(url)
        .then((response => response.json()))
        .then((data) => {
            resolve(data);
        })
    })
}
//Showing favourite superheroes by generating promises in a loop and 
//then rendering the result after  all those promises get over
function showFavouriteSuperHeros(){
    $('.all-img-container').empty();
    let allUrlRequests=[];
    let superHeroUrls = [];
    for(eachID of favListID){
        superHeroUrls.push(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/1571199179705402/${eachID}`)
    }
    // console.log(superHeroUrls);

    superHeroUrls.forEach(
        (userUrl) => {
            allUrlRequests.push(getSuperHerosById(userUrl));
        }
    )
    Promise.all(allUrlRequests).then((allSuperHeroes) =>{
        console.log(allSuperHeroes);
        showSuperHeroes(allSuperHeroes);
    })
    dynamicEventSetter();
    return;
}

//To store superHeroes added to favourites
function storeSuperHeroesToFavourite(cardDom){
    favListID.push(cardDom.id);
    setCookie();
    console.log('Inside add');
    // console.log(favListID);
}
//Removing from favourites list
function removeFromFavourite(cardDom){
    for(each in favListID){
        if(cardDom.id === favListID[each]){
            favListID.splice(each, 1);
        }
    }
    setCookie();
    console.log('Inside Remove');
    // console.log(favListID);
}


//HTTP call to fetch superheroes by name from API
function fetchSuperHeroesByName(name){
    // console.log(name);
    fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/1571199179705402/search/${name}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            showSuperHeroes( data.results);
            return;
        })
        .catch(function(){
            console.log('Error in fetching');
            return;
        });
}
function fetchSuperHeroesByID(id){
    // console.log(id);
    fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/1571199179705402/${id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // showSuperHeroes( data.results);
            // console.log(data);
            showSuperHeroDetails( data);
        })
        .catch(function(){
            console.log('Error in fetching');
            return;
        });
}

//Adding event listener On clicking search button
$('#search-button').click(function(e){
    let name = $('#search').val()
    if(name ===""){
        window.alert("Invalid Input");
        return;
    }
    e.preventDefault();
    fetchSuperHeroesByName(name);
});

// event listener ta check for changes in search box

function searchSuperHero(){
    let name = $('#search').val();
    if(name ===""){
        // window.alert("Invalid Input");
        name='a';
        // return;
    }
    fetchSuperHeroesByName(name);
}


//Template for image card dom
let newCardDom=function(superHero)
{
  return $(`<div class="img-card" id="${superHero.id}">
  <i class="fas fa-heart favrt-icon"></i>
  <img class="superhero-img" src="${superHero.image['url']}">
  <p class="superhero-name">${superHero.name}</p>
  <p class="real-name">${superHero.biography['full-name']}</p>
    </div>`)
}
//To displau profile details of one superhero
function showSuperHeroDetails(superHero){
    // console.log(superHero);
    // console.log(';here');
    modal.style.display = "block";
    let imgContainer =modal.children[1].children[0];
    let detailsContainer = modal.children[1].children[1];
    let bioDetailsList = detailsContainer.children[1].children[1];
    let powerDetailsList = detailsContainer.children[2].children[1];
    console.log(bioDetailsList);
    bioDetailsList.innerHTML ="";
    powerDetailsList.innerHTML = "";
    for (each of Object.keys(superHero.biography)){
        var point =  document.createElement('li');
        point.appendChild(document.createTextNode(`${each} : ${superHero.biography[each]}`));
        // point.innerText = `${each} : ${superHero.biography[each]}`;
        bioDetailsList.append(point);
    }
    
    for (each of Object.keys(superHero.powerstats)){
        var point =  document.createElement('li');
        point.appendChild(document.createTextNode(`${each} : ${superHero.powerstats[each]}`));
        // point.innerText = `${each} : ${superHero.biography[each]}`;
        powerDetailsList.append(point);
    }
    detailsContainer.children[0].innerHTML = superHero.name;
    imgContainer.setAttribute('src', superHero.image['url']);
   
}

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


 //When document load for first time
 window.onload = function(){
     fetchSuperHeroesByName('a');
     var tempfavListID = getCookie();
     if(typeof(tempfavListID) == 'string'){
        favListID = []
     }
    else{
        favListID = tempfavListID
    }
     console.log(typeof(favListID));
 }

homeButton.onclick = function(){
    fetchSuperHeroesByName('a');
};

visitFavButton.onclick = function(){
    showFavouriteSuperHeros();
};

searchInput.onkeyup = function(){
    setTimeout(searchSuperHero, 500);
};
