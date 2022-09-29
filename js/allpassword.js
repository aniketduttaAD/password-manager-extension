chrome.storage.local.get(["email", "token", "formval"], function (result) {
  let email = result.email;
  let token = result.token;
  let formval = result.formval;
  console.log(email, token, formval);
  const dataContainer = document.getElementById("dataContainer");
  formval &&
    formval.map((formValues) => {
      const liEle = document.createElement("li");
      Object.keys(formValues).map((key) => {
        const spanEle = document.createElement("span");
        spanEle.append(`${key}: ${formValues[key]}`);
        liEle.append(spanEle);
      });
      dataContainer.appendChild(liEle);
    });
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

function handleSubmit(e) {
  e.preventDefault();
  popup.classList.remove("open-popup");
  const formData = new FormData(e.target);
  const formValues = Object.fromEntries(formData);
  chrome.storage.local.get(["formval"], function (result) {
    let formValuesFromStorage = result.formval || [];
    chrome.storage.local.set(
      { formval: [...formValuesFromStorage, formValues] },
      function () {}
    );
  });
  e.target.reset();
  window.location.reload();
}

function handleDeleteAll() {
  chrome.storage.local.remove(["formval"]);
  window.location.reload();
}

document.getElementById("reset").addEventListener("click", forgot);
document.getElementById("logout").addEventListener("click", handleLogout);
document.getElementById("addItem").addEventListener("click", openPopup);
document.getElementById("popup").addEventListener("submit", handleSubmit);
document.getElementById("deleteAll").addEventListener("click", handleDeleteAll);
