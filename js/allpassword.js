chrome.storage.local.get(["email", "token"], function (result) {
  let email = result.email;
  let token = result.token;
  console.log(email, token);
});

const handleLogout = (e) => {
  chrome.storage.local.set({ token: null }, () => window.close());
};

const forgot = (e) => {
  fetch("resetpassword.html")
    .then((response) => response.text())
    .then((html) => {
      document.write(html);
    });
};

const addItem = (e) => {
  alert("button clicked");
}

document.getElementById("reset").addEventListener("click", forgot);
document.getElementById("logout").addEventListener("click", handleLogout);
document.getElementById("addItem").addEventListener("click", addItem);