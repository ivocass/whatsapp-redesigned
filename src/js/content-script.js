const SEARCH_ICON_SOURCE = chrome.runtime.getURL("assets/search-icon-24.png");

// once the app is loaded, add the top green banner
let appLoadedIntervalId = setInterval(() => {
	if (document.querySelector("#app")) {
		clearInterval(appLoadedIntervalId);

		addTopBanner();
	}
}, 1000);

// check for the container of the header buttons, then add the search button
let buttonsLoadedIntervalId = setInterval(() => {
	let buttonsContainer = document.querySelector("._3All_._3NrAe");

	if (buttonsContainer) {
		clearInterval(buttonsLoadedIntervalId);

		let button = document.createElement("button");
		button.id = "custom-search-button";
		button.title = "Search";
		button.addEventListener("click", searchButtonClickListener);

		let img = document.createElement("img");
		img.id = "custom-search-icon-img";
		img.src = SEARCH_ICON_SOURCE;

		button.appendChild(img);

		buttonsContainer = buttonsContainer.firstElementChild;

		buttonsContainer.insertBefore(button, buttonsContainer.firstChild);
	}
}, 1000);

// a banner equal to the original, which was missing in the dark theme
function addTopBanner() {
	let topGreenBanner = document.createElement("div");
	topGreenBanner.id = "topGreenBanner";

	document.querySelector("#app").appendChild(topGreenBanner);
}

// when the search button is clicked, toggle the visibility of the search bar
function searchButtonClickListener() {
	const searchBar = document.querySelector("._2EoyP");
	const displayStatus = getComputedStyle(searchBar).display;

	if (displayStatus === "block") {
		searchBar.style.display = "none";
	} else {
		searchBar.style.display = "block";

		// to focus a contentEditable div, change the tabIndex property first
		// thanks to @wafs https://stackoverflow.com/a/51129008
		let searchInputContainer = document.querySelector("._2FVVk.cBxw-");
		searchInputContainer.tabIndex = 1;

		searchInputContainer.lastChild.focus();
	}
}
