let containerData = document.querySelector(".container");
let navbar = document.createElement("nav");
navbar.innerHTML = `
    <section id="logo" class="col-3">Logo</section>
    <section id="navigation" class="col-5"></section>
    <section id="profile" class="col-4"></section>
`;
navbar.classList = "row align-items-center justify-content-center";
containerData.before(navbar);
let navigationBlock = document.querySelector("#navigation");
let profileBlock = document.querySelector("#profile");
let navigationData = [
  { label: "Home", path: "../homepage/index.html" },
  { label: "About Us", path: "../aboutus/about.html" },
  { label: "Contact Us", path: "../contactus/contact.html" },
  { label: "booking", path: "../booking/booking.html" },
  { label: "Add Places", path: "../addPlaces/addPlaces.html" },
];
let profileData = [
  { label: "BH", path: "#" },
  { label: "Notification", path: "#" },
  { label: "Sign Up", path: "../registration/register.html" },
  { label: "Log In", path: "../login/login.html" },
  { label: "Log Out" },
];

let userId = sessionStorage.getItem("id");
let clearLogin = () => {
  sessionStorage.removeItem("id");
  location.reload();
};
let createNavbar = (data, appendValues) => {
  let ul = document.createElement("ul");
  data.map((value) => {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let buttonContainer = document.createElement("aside");
    li.className = "col";
    if (value.label == "Sign Up" || value.label == "Log In") {
      if (!userId) {
        button.innerHTML = value.label;
        buttonContainer.append(button);
        li.append(buttonContainer);
      }
    } else {
      button.innerHTML = value.label;
      li.append(button);
    }
    if (value.label == "Log Out") {
      if (!userId) {
        button.style.display = "none";
      }
      button.addEventListener("click", clearLogin);
    }
    button.addEventListener("click", () => {
      if (value.path) {
        location.href = value.path;
      }
    });
    button.className = value.label;
    ul.append(li);
  });
  ul.classList = "row";
  appendValues.append(ul);
};
createNavbar(navigationData, navigationBlock);
createNavbar(profileData, profileBlock);
