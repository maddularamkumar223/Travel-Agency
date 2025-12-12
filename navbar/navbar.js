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
  { label: "BH", path: "../browserHistory/history.html" },
  { label: "Notification", path: "../notification/notification.html" },
  { label: "Sign Up", path: "../registration/register.html" },
  { label: "Log In", path: "../login/login.html" },
  { label: "Log Out" },
];

// ! Getting the userId
let userId = sessionStorage.getItem("id");

// ! Clearing the logout
let clearLogin = () => {
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("length");
  location.reload();
};

// ! Calculate the length to display the notifications

let notificationData = async () => {
  let response = await fetch(`http://localhost:3000/bookings`);
  let data = await response.json();
  let filterUserNNotifications = data.filter(
    (value) => value.notification === false && value.id === userId
  );
  sessionStorage.setItem("length", filterUserNNotifications.length);
};

// ! Make the notification value Zero

let createNavbar = (data, appendValues) => {
  let ul = document.createElement("ul");
  data.map((value) => {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let buttonContainer = document.createElement("aside");
    li.className = "col";

    // ! Displaying the sign up and the login button
    if (value.label == "Sign Up" || value.label == "Log In") {
      if (!userId) {
        button.innerHTML = value.label;
        buttonContainer.append(button);
        li.append(buttonContainer);
      } else {
        li.style.display = "none";
      }
    } else {
      button.innerHTML = value.label;
      li.append(button);
    }

    // ! Displaying the logout button
    if (value.label == "Log Out") {
      if (!userId) {
        li.style.display = "none";
      }
      button.addEventListener("click", clearLogin);
    }

    // ! Display the length of the notifications

    if (value.label === "Notification") {
      let sup = document.createElement("sup");
      sup.innerHTML = sessionStorage.getItem("length") || 0;
      button.append(sup);
    }
    // ! If the path is present then  it should work
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
notificationData();
