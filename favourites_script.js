{   
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
        document.cookie = `name=${JSON.stringify(Common.favListID)};expires= Thu, 30 June 2020 02:40:00 UTC; path=/`;
    }
    let favListID = [];
        //To display all the fetched images
    function showSuperHeroes(superHeroList){
        $('.all-img-container').empty();
        for(each of superHeroList){
            let newCard=newCardDom(each);
            // console.log(newCard[0].id);
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
    //Template for image card dom
    let newCardDom=function(superHero)
    {
    return $(`<div class="img-card" id="${superHero.id}">
    <i class="fas fa-heart favrt-icon"></i>
    <a href="details.html?id=${superHero.id}"><img class="superhero-img" src="${superHero.image['url']}" onerror="this.onerror=null;this.src='error.jpg';"></a>
    <p class="superhero-name">${superHero.name}</p>
    <p class="real-name">${superHero.biography['full-name']}</p>
        </div>`)
    }

     //When document load for first time
    window.onload = function(){
        var tempfavListID = getCookie();
        if(typeof(tempfavListID) == 'string'){
            Common.favListID = []
        }
        else{
            Common.favListID = tempfavListID
        }
        console.log(typeof(Common.favListID));
        console.log(Common.favListID);
    }


}