const game = document.getElementById("game");

const scoreDisplay = document.getElementById("score");
let btn = document.getElementById("startGame");
game.style.display = "none";
let categories = [];

let gameStarted = false;
btn.addEventListener("click", setupAndStart);
async function setupAndStart() {
  game.style.display = "flex";
  if (gameStarted === false) {
    getCategoryIds();
  }
}

async function getCategoryIds() {
  gameStarted = true;
  let categoryIds = [];

  const response = await axios.get("http://jservice.io/api/random?count=6");

  for (let catId of response.data) {
    categoryIds.push(catId.category_id);
  }

  getCategory(categoryIds);
}

async function getCategory(catId) {
  let category = {};
  let cat = [];
  let response;
  let categoryIndex = 0;
  for (let cId of catId) {
    const response = await axios.get(
      `https://jservice.io/api/category?id=${cId}`
    );

    //Start with a blank category
    category = {
      title: response.data.title,
      clues: [],
    };

    //Add every clue within a category to our database of clues
    let cClues = shuffle(response.data.clues)
      .splice(0, 5)
      .forEach((clue, index) => {
        //Create unique ID for this clue
        let clueId = categoryIndex + "-" + index;
        category.clues.push(clueId);

        category.clues[clueId] = {
          question: clue.question,
          answer: clue.answer,
          showing: "null",
        };
      });
    categoryIndex++;

    categories.push(category);
  }

  categories.forEach((catgory) => addCategory(catgory));
}

function addCategory(catgory) {
  const column = document.createElement("div");

  column.classList.add("card-column");

  const categoryTitle = document.createElement("div");
  categoryTitle.classList.add("card-title");
  categoryTitle.innerHTML = catgory.title;
  column.appendChild(categoryTitle);
  game.append(column);

  catgory.clues.forEach((clue) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (catgory.clues[clue].showing === "answer") {
      console.log("all done");
    }
    if (catgory.clues[clue].showing === "null") {
      card.innerHTML = "?";
    }
    card.setAttribute("data-question", catgory.clues[clue].question);
    card.setAttribute("data-answer", catgory.clues[clue].answer);

    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (this.showing === undefined) {
    this.innerHTML = "";

    const textDisplay = document.createElement("div");
    textDisplay.classList.add("card-text");

    this.innerHTML = this.getAttribute("data-question");
    this.showing = "question";
  } else if (this.showing === "question") {
    this.innerHTML = "";
    const textDisplay = document.createElement("div");
    textDisplay.classList.add("card-text");
    textDisplay.setAttribute("class", "card-answer");
    this.innerHTML = this.getAttribute("data-answer");
    this.showing = "answer";
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
