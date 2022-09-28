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

let popup = document.getElementById("popup");
function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}

document.getElementById("reset").addEventListener("click", forgot);
document.getElementById("logout").addEventListener("click", handleLogout);
document.getElementById("addItem").addEventListener("click", openPopup);
document.getElementById("done").addEventListener("click", closePopup);
