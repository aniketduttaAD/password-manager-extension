let userId, cmasterpassword, nmasterPassword;

chrome.storage.local.get(["userId"], function (result) {
  userId = result.userId;
  document.getElementById("username").textContent = userId;
});

const handleClick = (e) => {
  nmasterPassword = document.getElementById("nmasterpassword").value;
  cmasterpassword = document.getElementById("cmasterpassword").value;
  if (nmasterPassword == cmasterpassword) {
    // get all users from db
    chrome.storage.local.get(["users"], function (result) {
      let users = result.users || [];
      // find user in list of users
      let user = users.find((user) => user.userId === userId);
      if (!user) alert("User not found!");
      else {
        users = users.map((user) => {
          if (user.userId === userId) user.masterPassword = nmasterPassword;
          return user;
        });
        chrome.storage.local.set({ ["users"]: users }, function () {});
        document.getElementById("successful").style.display = "inline-block";
      }
    });
  } else {
    alert("Passwords do not match...");
  }
};
document.getElementById("submit").addEventListener("click", handleClick);
