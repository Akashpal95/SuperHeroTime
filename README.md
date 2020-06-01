# SuperHeroTime
A go-to place for all your superhero-trivia needs.
# Project Description
It is a simple web application to settle all your superhero related arguments made with HTML, CSS, Vanilla JavaScript and love. It also saves your favourite superheroes in the cookies for, you know, when you need them to fight the cookie monster for you.I'll shut up now.
It has all the information about all the superheros you love which I have fetched from this "https://superheroapi.com/" API.
You can go to the website, login with facebook and start having fun with your newly acquired access-token or you can visit my
website which is hosted here at our beloved github.
# https://akashpal95.github.io/SuperHeroTime/
# Few things to know
<ul>
<li>Put all the files in the same folder.
<li>Put styling sheet and js script paths properly.
<li>I have used cookies to save the favourites list.
<li>Remember that cookies can store only string so I have 'stringify'ied the favourite superheroes ID list and i am parsing
  it to my list whenever the window is loaded.
<li>To fetch all the favourite superheroes from the list of ID's I have synced up multiple promises to perform a single task
  after they are over using Promise.all you can read up more about it here : https://www.andreasreiterer.at/single-result-with-promise-all/
 <li>To avoid cors issues while fetching from the API without this website being hosted you can prefix the fetch url with "https://cors-anywhere.herokuapp.com/".
<li> Rest of it is pretty basic. I'm sure you'll be able to figure it out.
<li>Now give yourself a pat in the back.(self-motivation is important XD)
</ul>
