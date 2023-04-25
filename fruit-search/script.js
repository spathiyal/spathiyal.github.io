const input = document.querySelector("#fruit");

const suggestions = document.querySelector(".suggestions ul");

const suggestionsDiv = document.querySelector(".suggestions");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

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

  if (e.target.value.length <= 0) {
    suggestionsDiv.style.display = "none";
  } else {
    showSuggestions(search(e.target.value), e.target.value);
  }
}

// create dropdown with the lists of items from results array
function showSuggestions(results, innerText) {
  suggestions.innerHTML = "";

  if ((innerText != null || innerText != "") && results.length != 0) {
    for (let val of results) {
      suggestionsDiv.style.display = "inline-block";
      let el = document.createElement("li");
      // let splitStr = val.split(innerText);
      // el.innerHTML = splitStr.join(`<strong>${innerText}</strong>`);
      el.textContent = val;
      suggestions.appendChild(el);
    }
  } else {
    suggestionsDiv.style.display = "none";
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
