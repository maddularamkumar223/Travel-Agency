let displayContainer = document.querySelector(".container");

let displayPlaces = async () => {
  let response = await fetch("http://localhost:3000/places");
  let placesData = await response.json();
  placesData.forEach((value) => {
    let placeContainer = document.createElement("article");
    placeContainer.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    placeContainer.innerHTML = `
        <figure><img src=${value.image}/></figure>
        <p>Place : ${value.placeName}</p>
        <p>Price : ${value.price}</p>
        <p>Description : ${value.description}</p>
        <p>Days : ${value.days}</p>
        <button>Add To Package</button>
    `;
    displayContainer.append(placeContainer);
  });
};
displayPlaces();
