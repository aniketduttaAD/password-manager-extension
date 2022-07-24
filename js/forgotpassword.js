let userId, cmasterpassword, nmasterPassword;

chrome.storage.local.get(["userId"], function (result) {
  userId = result.userId;
  document.getElementById("username").textContent = userId;
});

const handleClick = (e) => {
  nmasterPassword = document.getElementById("nmasterpassword").value;
  cmasterpassword = document.getElementById("cmasterpassword").value;
  if (nmasterPassword == cmasterpassword) {
    chrome.storage.local.set(
      { nmasterPassword: nmasterPassword },
      function () {}
    );
    document.getElementById("successful").style.display = "inline-block";
  } else {
    alert("Passwords do not match...");
  }
};
document.getElementById("submit").addEventListener("click", handleClick);
