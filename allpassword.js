chrome.storage.local.get(["userId", "isLoggedIn"], function (result) {
  let userId = result.userId;
  let isLoggedIn = result.isLoggedIn;
});

const handleLogout = (e) => {
  chrome.storage.local.set({ isLoggedIn: false }, () => window.close());
};

document.getElementById("logout").addEventListener("click", handleLogout);
