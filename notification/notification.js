let displayDataContainer = document.querySelector(".container");

let notificationValue = async () => {
  let response = await fetch(`http://localhost:3000/bookings`);
  let data = await response.json();

  let filterUserNNotifications = data.filter(
    (value) =>
      value.notification === false &&
      value.userId === sessionStorage.getItem("id")
  );

  let filerDatDisplay = data.filter(
    (value) => value.userId === sessionStorage.getItem("id")
  );

  filerDatDisplay.forEach((value) => {
    let p = document.createElement("p");
    p.innerHTML = `The Booking is Confirmed, on ${value.bookingDate} and the place is ${value.places}`;
    displayDataContainer.append(p);
  });
  if (filterUserNNotifications.length > 0) {
    for (let value of filterUserNNotifications) {
      await seenTrue(value.id);
    }
  }
  sessionStorage.setItem("length", filterUserNNotifications.length);
  let sup = document.querySelector("sup");
  sup.innerHTML = sessionStorage.getItem("length");
};
let seenTrue = async (id) => {
  await fetch(`http://localhost:3000/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ notification: true }),
  });
};

notificationValue();
