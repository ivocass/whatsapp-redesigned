addEventListener("click", (e) => {
	if (e.target.id === "btn") {
		pingContentScript();
	}
});

function pingContentScript() {
	browser.tabs.query({ url: "https://www.messenger.com/*" }, function (tabs) {
		browser.tabs.sendMessage(tabs[0].id, { action: "asdf" }, function (response) {
			console.log(response);
		});
	});
}

pingContentScript();
