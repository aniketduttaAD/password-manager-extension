document.addEventListener("DOMContentLoaded", () => {
  let rmasterPassword = "abc",
    ruserId = "abcd";
  //set values to local storage
  chrome.storage.local.get(["nmasterPassword"], function (result) {
    rmasterPassword = result.nmasterPassword;
  });
  // get values from local storage
  let userId, isLoggedIn;
  chrome.storage.local.get(["userId", "isLoggedIn"], function (result) {
    userId = result.userId;
    isLoggedIn = result.isLoggedIn;
    if (userId === ruserId && isLoggedIn) {
      const newWindow = window.open("about:blank", "_blank");
      newWindow.location = "allpassword.html";
    } else {
      const loginForm = document.getElementById("loginForm");
      const forgot = document.getElementById("reset");
      const newuser = document.getElementById("newUser");
      let contentSection = document.getElementById("contentSection");

      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const userId = document.getElementById("userId").value;
        const masterPassword = document.getElementById("masterPassword").value;
        if (rmasterPassword === masterPassword && ruserId === userId) {
          document.getElementById("invalidCredentialsMsg").style.display =
            "none";

          // store values to local storage
          const userIdKey = "userId";
          const isloggedInKey = "isLoggedIn";

          chrome.storage.local.set({ [userIdKey]: userId }, function () {
            console.log("userId is set to " + userId);
            chrome.storage.local.set({ [isloggedInKey]: true }, function () {
              console.log("isLoggedIn is set to " + isLoggedIn);
              const newWindow = window.open("about:blank", "_blank");
              newWindow.location = "allpassword.html";
            });
          });
        } else {
          document.getElementById("invalidCredentialsMsg").style.display =
            "inline-block";
        }
      });

      forgot.addEventListener("click", function () {
        fetch("forgotpassword.html")
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
