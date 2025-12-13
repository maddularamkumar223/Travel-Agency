let displayHistory = document.querySelector(".container");

let data = async () => {
  let response = await fetch("http://localhost:3000/bookings");
  let data = await response.json();
  let filterHistory = data.filter(
    (value) => value.userId === sessionStorage.getItem("id")
  );

  filterHistory.map((value) => {
    let historyContainer = document.createElement("article");
    let place = document.createElement("p");
    let contact = document.createElement("p");
    let bookingData = document.createElement("p");
    let persons = document.createElement("p");

    place.innerText = `Place : ${value.places}`;
    contact.innerText = `Contact: ${value.contact}`;
    bookingData.innerText = `Booking Data : ${value.bookingDate}`;
    persons.innerText = `Persons : ${value.persons}`;

    historyContainer.className = "col-12 col-md-4 col-lg-3";
    historyContainer.append(place, contact, bookingData, persons);
    displayHistory.append(historyContainer);
  });
};

data();
