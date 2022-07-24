const email = [];
const userId = [];
const masterPassword = [];
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit").addEventListener("click", function () {
    for (let i = 0; i < 2; i++) {
      email [i]= document.getElementById("email").value;
      userId [i]= document.getElementById("userId").value;
      masterPassword [i]= document.getElementById("masterPassword").value;
    }
    for(let i=0; i< 2; i++)
    {
      console.log(email[i]);
      console.log(userId[i]);
      console.log(masterPassword[i]);
    }
  });
});
