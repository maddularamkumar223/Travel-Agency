let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  let email = formData.get("email");
  let password = formData.get("password");
  validation(email, password);
});
let validation = async (email, password) => {
  let response = await fetch("http://localhost:3000/users");
  let userData = await response.json();
  let singleUser = userData.find(
    (value) => value.email == email && value.password == password
  );
  if (singleUser) {
    alert("login Successful");
    location.href = "../homepage/index.html";
    sessionStorage.setItem("id",singleUser.id)
  } else {
    alert("Invalid Credentials");
    location.href = "../registration/register.html";
  }
  console.log(singleUser);
};
