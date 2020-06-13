const Common = (function(){

    let timerId = undefined;
    let favListID = []

    //To store superHeroes added to favourites
    function storeSuperHeroesToFavourite(cardDom){
        favListID.push(cardDom.id);
        setCookie();
        console.log('Inside add');
    }
    //Removing from favourites list
    function removeFromFavourite(cardDom){
        for(each in favListID){
            if(cardDom.id === favListID[each]){
                favListID.splice(each, 1);
            }
        }
        Common.setCookie();
        console.log('Inside Remove');
    }
    //get cookies into local Variable
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
    //Set cookies from local variable
    function setCookie(){
        console.log(favListID);
        document.cookie = `name=${JSON.stringify(favListID)};expires= Thu, 30 June 2021 02:40:00 UTC; path=/`;
    }


    //https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript - link to understand throttle and debounce
    
    //Throttle function implementation
    let throttleFunction = function(func, delay){
        if(timerId){
            return;
        }
        timerId = setTimeout(function(){
            func();
            timerId = undefined;
        }, delay)
    }

    //Debounce function implementation
    let debounceFunction = function(func, delay){
        clearTimeout(timerId);
        timerId = setTimeout(func, delay);
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

    return {
        favListID,
        getCookie,
        setCookie,
        throttleFunction,
        debounceFunction,
        storeSuperHeroesToFavourite,
        removeFromFavourite,
        newCardDom
    }

})();