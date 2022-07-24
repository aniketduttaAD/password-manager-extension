const registerNewUser = () => {
  // get list of users from db
  chrome.storage.local.get(["users"], (result) => {
    let users = result.users || [];
    // get form values
    const userId = document.getElementById("userId").value;
    const email = document.getElementById("email").value;
    const masterPassword = document.getElementById("masterPassword").value;

    // check if all fields entered
    if (!userId || !email || !masterPassword)
      return alert("enter all the details");

    // check if user already exists in db
    if (users.find((user) => user.userId === userId)) {
      alert("User already exists!");
    } else {
      // store user in db
      users.push({
        userId: userId,
        email: email,
        masterPassword: masterPassword,
      });
      chrome.storage.local.set(
        {
          ["users"]: users,
        },
        () => {}
      );
    }
  });
};

document.getElementById("submit").addEventListener("click", registerNewUser);
