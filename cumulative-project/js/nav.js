"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $("#new-story-form").addClass("hidden");
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();

  /*=======================*/
  $loginForm.hide();
  $signupForm.hide();

  $("#navbar-story-links").removeClass("hidden");
  $("#navbar-story-links").show();
}
// show new story form when user clicks submit link

$body.on("click", "#new-story-link", showNewStoryForm);

function showNewStoryForm() {
  hidePageComponents();
  $("#new-story-form").removeClass("hidden");
  $newStoryForm.show();
  putStoriesOnPage();
}

// show favourites when user clicks favourite link

$body.on("click", "#favourites-link", showFavouriteForm);

function showFavouriteForm(evt) {
  hidePageComponents();
  $favStoriesList.empty();
  $favStoriesList.show();
  var html = "<h5>You don't have any favourites!</h5>";
  if (currentUser.favorites.length === 0) {
    $favStoriesList.append(html);
  }
  for (let story of currentUser.favorites) {
    const $favStory = generateStoryMarkup(story, false);
    $favStoriesList.prepend($favStory);
  }

  $favStoriesList.show();
}

// show own story form when user clicks my story link

$body.on("click", "#my-story-link", showOwnStoryForm);

function showOwnStoryForm() {
  hidePageComponents();
  $myStoriesList.empty();
  $myStoriesList.show();

  var html = "<h5>You don't own any stories!</h5>";

  if (currentUser.ownStories.length == 0) {
    $myStoriesList.append(html);
  }
  for (let story of currentUser.ownStories) {
    const $ownStory = generateStoryMarkup(story, true);
    $myStoriesList.prepend($ownStory);
  }

  $myStoriesList.show();
}
