const handleLogin = async (email, password) => {
  //login user
  const response = await fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "cors",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const data = await response.json().then((err) => err);
    const errorMsgEle = document.getElementById("invalidCredentialsMsg");
    errorMsgEle.textContent = data.message;
    errorMsgEle.style.display = "inline-block";
    return;
  }

  const token = await response.json().then((data) => data.token);

  // store values to local storage
  chrome.storage.local.set({ email }, function () {
    console.log("email is set to " + email);
    chrome.storage.local.set({ token }, function () {
      console.log("token is set to " + token);
      const newWindow = window.open("about:blank", "_blank");
      newWindow.location = "allpassword.html";
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // get values from local storage
  chrome.storage.local.get(["token"], function (result) {
    const token = result.token;
    if (token) {
      const newWindow = window.open("about:blank", "_blank");
      newWindow.location = "allpassword.html";
    } else {
      const loginForm = document.getElementById("loginForm");
      const newuser = document.getElementById("newUser");
      const forgotPassword = document.getElementById("forgotPassword");

      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // get form data
        const userId = document.getElementById("userId").value;
        const password = document.getElementById("password").value;
        handleLogin(userId, password);
      });

      forgotPassword.addEventListener("click", function () {
        fetch("forgotPassword.html")
          .then((response) => response.text())
          .then((html) => {
            document.write(html);
          });
      });

      newuser.addEventListener("click", function () {
        fetch("newuser.html")
          .then((response) => response.text())
          .then((html) => {
            document.write(html);
          });
      });
    }
  });
});
