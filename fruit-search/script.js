const input = document.querySelector("#fruit");

const suggestions = document.querySelector(".suggestions ul");

const suggestionsDiv = document.querySelector(".suggestions");



const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//create array items based on search criteria (str)
 function search(str) {
  let results = [];
  results = fruit.filter((val) =>
    val.toLowerCase().includes(str.toLowerCase())
  );

  return results;
}
 
// call search function to trigger showSuggestion to show dropdown values
function searchHandler(e) {
  e.preventDefault();
  showSuggestions(search(e.target.value, e.target.value));
   
}


// create dropdown with the lists of items from results array
function showSuggestions(results, inputVal) {
  suggestions.innerHTML = "";

  if (results.length != 0) {
    for (let i = 0; i < results.length; i++) {
      suggestionsDiv.style.display = "inline-block";
      let el = document.createElement("li");
      el.textContent = results[i];
      suggestions.appendChild(el);
    }
  }
}
// keep selected fruit in search input
function useSuggestion(e) {
  input.value = e.srcElement.firstChild.data;
  //remove the dropdown
  suggestionsDiv.style.display = "none";
  // empty search bar when user click the input box
  input.onfocus = function () {
    input.value = "";
  };
}
// events call
input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
