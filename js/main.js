//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const suggestions = document.querySelector('.suggestions')
const searchInput = document.querySelector('.search-input')

searchInput.addEventListener('keyup', function(e){
 if(e.key === 'Enter'){
  getFetch()
 } else {
  showSuggestions()
 }
})

document.querySelector('button').addEventListener('click', getFetch)

suggestions.addEventListener('click',(e) => {
 if(e.target.classList.contains('suggestion')){
  searchInput.value = e.target.textContent;
  suggestions.innerHTML = '';
  // getFetch();
 }
});


//display suggestions as dropdown list on the search bar as user enters the value of the search bar
function showSuggestions(){
 const searchTerm = searchInput.value;

 if (searchTerm.length < 1){
  suggestions.innerHTML = '';
  return
 }

 const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

 fetch(url)
 .then(res => res.json()) // parse response as JSON
 .then(data => {
  if (data.drinks && data.drinks.length > 0){
   const suggestionsHTML = data.drinks.map(drink => `<li class="list-group-item suggestion">${drink.strDrink}</li>`).join('')
   suggestions.innerHTML = suggestionsHTML;

  const suggestionItems = suggestions.querySelectorAll(".suggestion");
  suggestionItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("active");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("active");
    });
  });

  } else {
   suggestions.innerHTML = '';
  }
 })
 .catch(err => {
  console.log(`error ${err}`)
 })
}


function getFetch(){
 let drink = document.querySelector('input').value

 if (drink.length < 1){
  alert("Please enter a drink");
  return;
 }

  const url =
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        if (drink.toLowerCase() != data.drinks[0].strDrink.toLowerCase()) {
          alert("Please enter a valid drink");
          return;
        }

        console.log(data.drinks[0])
        let myDrink = data.drinks[0];
        document.querySelector('.card-title').innerText = myDrink.strDrink
        document.querySelector('.img-fluid').src =
          myDrink.strDrinkThumb;
        document.querySelector('.instructions').innerText = myDrink.strInstructions
        let count = 1;
        let ingredients = [];
        for (let i in myDrink){
         let ingredient = '';
         let measure = '';
         if(i.startsWith("strIngredient") && myDrink[i]){
          ingredient =  myDrink[i];
          if (myDrink[`strMeasure` + count]){
           measure = myDrink[`strMeasure` + count];
          } else {
           measure = '';
          }
          count+=1;
          ingredients.push(`${measure} ${ingredient}`)
           
      }}
        document.querySelector('.list-group-flush').innerHTML = ingredients.map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('')
     })
      document
        .querySelector('#card-view')
        .classList.remove("hidden")

        .catch((err) => {
          console.log(`error ${err}`);
        });
     }
