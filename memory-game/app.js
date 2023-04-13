
    const gameContainer = document.getElementById("game");

    let firstCard = null;
    let secondCard = null;
    let cardsFlipped = 0;
    let noClicking = false;

    const COLORS = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "red",
        "blue",
        "green",
        "orange",
        "purple",
    ];



    // here is a helper function to shuffle an array
    // it returns the same array with values shuffled
    // it is based on an algorithm called Fisher Yates if you want ot research more
    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    let shuffledColors = shuffle(COLORS);

    // this function loops over the array of colors
    // it creates a new div and gives it a class with the value of the color
    // it also adds an event listener for a click for each card
    function createDivsForColors(colorArray) {
        for (let color of colorArray) {
            // create a new div
            const newDiv = document.createElement("div");

            // give it a class attribute for the value we are looping over
            newDiv.classList.add(color);

            // call a function handleCardClick when a div is clicked on
            newDiv.addEventListener("click", handleCardClick);

            // append the div to the element with an id of game
            gameContainer.append(newDiv);
            

        }
    }

    // TODO: Implement this function!
    function handleCardClick(event) {
        // you can use event.target to see which element was clicked
        //console.log("you just clicked", event.target);
        event.preventDefault();
        if (noClicking) return;
        if (event.target.classList.contains("flipped")) return;
      
        let currentCard = event.target;
        currentCard.style.backgroundColor = currentCard.classList[0];
      
        if (!firstCard || !secondCard) {
          currentCard.classList.add("flipped");
          firstCard = firstCard || currentCard;
          secondCard = currentCard === firstCard ? null : currentCard;
        }
      
        if (firstCard && secondCard) {
          noClicking = true;
          // debugger
          let gif1 = firstCard.className;
          let gif2 = secondCard.className;
      
          if (gif1 === gif2) {
            cardsFlipped += 2;
            firstCard.removeEventListener("click", handleCardClick);
            secondCard.removeEventListener("click", handleCardClick);
            firstCard = null;
            secondCard = null;
            noClicking = false;
          } else {
            setTimeout(function() {
              firstCard.style.backgroundColor = "";
              secondCard.style.backgroundColor = "";
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              firstCard = null;
              secondCard = null;
              noClicking = false;
            }, 1000);
          }
        }
      
        if (cardsFlipped === COLORS.length) 
        document.getElementById('gameOver').innerHTML = 'Game Over!';
      }
      
  

    
    // when the DOM loads
    createDivsForColors(shuffledColors);



 
 