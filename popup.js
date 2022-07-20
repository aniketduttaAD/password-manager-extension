document.addEventListener("DOMContentLoaded", function () {
  const rmasterPassword = "abc",
    ruserId = "abcd";

  // get values from local storage
  let userId, isLoggedIn;
  chrome.storage.local.get(["userId", "isLoggedIn"], function (result) {
    userId = result.userId;
    isLoggedIn = result.isLoggedIn;
    if (userId === ruserId && isLoggedIn) {
      fetch("allpassword.html")
        .then((response) => response.text())
        .then((html) => {
          const newWindow = window.open("about:blank", "_blank");
          newWindow.document.write(html);
        });
    } else {
      const loginForm = document.getElementById("loginForm");
      const forgot = document.getElementById("reset");
      const newuser = document.getElementById("newUser");
      const contentSection = document.getElementById("contentSection");

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
              fetch("allpassword.html")
                .then((response) => response.text())
                .then((html) => newWindow.document.write(html));
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
          .then((html) => (contentSection.innerHTML = html));
      });

      newuser.addEventListener("click", function () {
        fetch("newuser.html")
          .then((response) => response.text())
          .then((html) => (contentSection.innerHTML = html));
      });
    }
  });
});
