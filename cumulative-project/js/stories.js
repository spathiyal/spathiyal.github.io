"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, ownStories) {
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <div class="inner-li">
        <div class="trash-star-cont">
          ${ownStories ? '<span class="trash">' : ""}
          ${ownStories ? '<i class="fas fa-trash-alt"></i>' : ""}
          ${ownStories ? "</span>" : ""}
          <span class="star">
            <i class="${
              currentUser && currentUser.getFavorites(story) ? "fas" : "far"
            } fa-star">
            </i>
          </span>
        </div>
        <div class="main-story-cont">
          <div class="inner-title-host">
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          </div>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </div>
        </div>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story, false);

    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// Submit new stories

async function addNewStory(e) {
  e.preventDefault();
  const author = $("#author-name").val();

  const title = $("#story-title").val();
  const url = $("#story-url").val();
  if (author.length != 0 && title.length != 0 && url.length != 0) {
    const newStory = await storyList.addStory(currentUser, {
      title,
      url,
      author,
    });
    const $newStory = generateStoryMarkup(newStory);
    $allStoriesList.prepend($newStory);
    $newStoryForm.addClass("hidden");

    putStoriesOnPage();
  }
}

$body.on("click", "#new-story-form", addNewStory);

// submit listener for adding stories

// function that toggles the favorites
const toggleFavoriteStories = async (e) => {
  e.preventDefault();
  // $(e.delegateTarget).parent().css( "background-color", "black" );
  if (!currentUser) return;
  const $target = $(e.target);
  const targetId = $target.closest("li").attr("id");
  const targetStory = storyList.stories.find(
    (story) => story.storyId === targetId
  );
  if ($target.hasClass("fas")) {
    await currentUser.removeFavorites(targetStory);

    // $("favourites-link").css("background-color","orange");
  } else {
    await currentUser.addFavourites(targetStory);
  }
  $target.toggleClass("fas far");

  if ($target.closest("ol").attr("id") === "fav-stories-list")
    showFavouriteForm();

  if (e.delegateTarget.id === "favourite-stories-list") {
    showFavouriteForm();
  }
};

// click handler for toggling favorites on stars
$allStoriesList.on("click", "i", toggleFavoriteStories);
$favStoriesList.on("click", "i", toggleFavoriteStories);
$myStoriesList.on("click", "i.fa-star", toggleFavoriteStories);

//  deleting a story of the login user
const deleteOwnStories = async (e) => {
  const $target = $(e.target);
  const targetId = $target.closest("li").attr("id");
  const targetStory = storyList.stories.find(
    (story) => story.storyId === targetId
  );

  await storyList.deleteStory(currentUser, targetStory);
  showOwnStoryForm();
};

// click handler for deleting own stories
$myStoriesList.on("click", "i.fa-trash-alt", deleteOwnStories);
