const handleRegister = async (data) => {
  const { email, firstName, lastName, userId, password } = data;

  // register user
  const response = await fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "cors",
    body: JSON.stringify({
      userId,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const data = await response.json().then((err) => err);
    const errorMsgEle = document.getElementById("errorMsg");
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

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  // get form values
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const userId = document.getElementById("userId").value;
  const password = document.getElementById("password").value;
  // check if all fields entered
  if (!userId || !email || !firstName || !lastName || !password)
    return alert("Enter all the details");
  handleRegister({
    email,
    firstName,
    lastName,
    userId,
    password,
  });
});
