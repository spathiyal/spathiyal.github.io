const $gifArea = $("#gif-area");
const $inputStr = $("#search");
// add gif
function showGif(res) {
  let random = Math.floor(Math.random());

  let $gif = $("<img>", {
    src: res.data[random].images.original.url,
    class: "text-center",
  });

  $gifArea.append($gif);
}

$("form").on("submit", async function (e) {
  e.preventDefault();

  let searchStr = $inputStr.val();
  $inputStr.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchStr,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  showGif(response.data);
});

/* remove gif */

$("#remove").on("click", function () {
  $gifArea.empty();
});
