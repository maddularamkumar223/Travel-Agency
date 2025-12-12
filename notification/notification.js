let notificationValue = async () => {
  let response = await fetch(`http://localhost:3000/bookings`);
  let data = await response.json();
  let filterUserNNotifications = data.filter(
    (value) => value.notification === false && value.id === userId
  );

  if (filterUserNNotifications > 0) {
    filterUserNNotifications.map((value) => {
      seenTrue(value.id);
    });
  }
  //   sessionStorage.setItem("length", filterUserNNotifications.length);
};

notificationValue();

let seenTrue = async (id) => {
  await fetch(`http://localhost:3000/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ notification: true }),
  });
};
