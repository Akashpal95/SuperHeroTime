( function() {
var allSuperHeroList = []
var onloadFlag = true;
var searchInput = document.getElementById('search');


dynamicEventSetter();

function dynamicEventSetter(){ 
   //Set events for all favourite buttons
   var favButtons = document.getElementsByClassName('favrt-icon');
   for(let each of favButtons){
       each.addEventListener('click', function(){
            console.log(each.style.color);
            if (each.style.color === 'red'){
                each.style.color = 'white';
                Common.removeFromFavourite(each.parentElement);
            }
            else{
            each.style.color = 'red';
            Common.storeSuperHeroesToFavourite(each.parentElement);
            }
       });
   }
}
//To display all the fetched images
function showSuperHeroes(superHeroList){
    $('.all-img-container').empty();
    for(each of superHeroList){
        let newCard=Common.newCardDom(each);
        if(Common.favListID.includes(newCard[0].id)){
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
    for(eachID of Common.favListID){
        superHeroUrls.push(`https://superheroapi.com/api.php/1571199179705402/${eachID}`)
    }
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

//HTTP call to fetch superheroes by name from API
function fetchSuperHeroesByName(name){
    console.log('coming here');
    if(allSuperHeroList.length > 0 && name === "a"){
        // console.log('Inside');
        console.log(allSuperHeroList)
        showSuperHeroes(allSuperHeroList);
        return;
    }
    // console.log("Fetching...");
    fetch(`https://superheroapi.com/api.php/1571199179705402/search/${name}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if(onloadFlag){
            allSuperHeroList = data.results;
            onloadFlag = false;
            }
            showSuperHeroes( data.results);
            return;
        })
        .catch(function(){
            console.log('Error in fetching');
            return;
        });
}
function fetchSuperHeroesByID(id){
    fetch(`https://superheroapi.com/api.php/1571199179705402/${id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
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
        name='a';
    }
    fetchSuperHeroesByName(name);
}


 //When document load for first time
 window.onload = function(){
     fetchSuperHeroesByName('a'); 
     var tempfavListID = Common.getCookie();
     if(typeof(tempfavListID) == 'string'){
        Common.favListID = []
     }
    else{
        Common.favListID = tempfavListID
    }
     console.log(typeof(Common.favListID));
 }

searchInput.onkeyup = function(){
    // throttleFunction(searchSuperHero, 500);
    Common.debounceFunction(searchSuperHero, 500);
};
})();
