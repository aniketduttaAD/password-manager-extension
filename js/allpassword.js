chrome.storage.local.get(["userId", "isLoggedIn"], function (result) {
  let userId = result.userId;
  let isLoggedIn = result.isLoggedIn;
});

const handleLogout = (e) => {
  chrome.storage.local.set({ isLoggedIn: false }, () => window.close());
};

const forgot = (e) => {
  fetch("forgotpassword.html")
  .then((response) => response.text())
  .then((html) => {
    document.write(html);
  });
};


document.getElementById("reset").addEventListener("click",forgot);
document.getElementById("logout").addEventListener("click", handleLogout);
