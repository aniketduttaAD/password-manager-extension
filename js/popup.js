document.addEventListener("DOMContentLoaded", () => {
  // get values from local storage
  chrome.storage.local.get(["isLoggedIn"], function (result) {
    const isLoggedIn = result.isLoggedIn;
    if (isLoggedIn) {
      const newWindow = window.open("about:blank", "_blank");
      newWindow.location = "allpassword.html";
    } else {
      const loginForm = document.getElementById("loginForm");
      const newuser = document.getElementById("newUser");

      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // get form data
        const userId = document.getElementById("userId").value;
        const masterPassword = document.getElementById("masterPassword").value;
        // get all user details from db
        chrome.storage.local.get(["users"], function (result) {
          const users = result.users || [];
          // find user in list of users
          const user = users.find((user) => user.userId === userId);
          if (!user) {
            // if user record not found in db
            alert("User not found!");
          } else {
            // if user record found in db
            if (
              user.userId === userId &&
              user.masterPassword === masterPassword
            ) {
              // if user deatils match
              document.getElementById("invalidCredentialsMsg").style.display =
                "none";

              // store values to local storage
              const userIdKey = "userId";
              const isloggedInKey = "isLoggedIn";

              chrome.storage.local.set({ [userIdKey]: userId }, function () {
                console.log("userId is set to " + userId);
                chrome.storage.local.set(
                  { [isloggedInKey]: true },
                  function () {
                    console.log("isLoggedIn is set to " + isLoggedIn);
                    const newWindow = window.open("about:blank", "_blank");
                    newWindow.location = "allpassword.html";
                  }
                );
              });
            } else {
              // if user deatils incorrect
              document.getElementById("invalidCredentialsMsg").style.display =
                "inline-block";
            }
          }
        });
      });

      const forgotPassword = document.getElementById("forgotPassword");
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
