{       
    let renderPage = function(superHero){
        let imgContainer = document.getElementsByClassName('profile-img');
        imgContainer[0].setAttribute('src', superHero.image['url']);
        details = document.getElementsByClassName('details')[0];
        details.children[0].innerHTML = superHero.name;
        let bioDetailsList = details.children[1].children[1];
        let powerDetailsList = details.children[2].children[1];
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
    }

    function fetchSuperHeroesByID(id){
        fetch(`https://superheroapi.com/api.php/1571199179705402/${id}`)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                renderPage( data);
            })
            .catch(function(){
                console.log('Error in fetching');
                return;
            });
    }
    window.onload = function(req){
        const urlParams = new URLSearchParams(window.location.search);
        superHeroId = urlParams.get('id');
        fetchSuperHeroesByID(superHeroId);
        
    }
}
