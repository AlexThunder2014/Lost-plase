const map = L.map("map").setView([51.65, 6.62], 9);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap-Mitwirkende"
    }
).addTo(map);

document
.getElementById("darkModeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});

let places = [];

function markerColor(status){

    switch(status){

        case "Ja":
            return "green";

        case "Teilweise":
            return "orange";

        default:
            return "red";

    }

}

function createMarker(place){

    const color = markerColor(place.legalAccess);

    const marker = L.circleMarker(place.gps,{
        radius:10,
        color:color,
        fillColor:color,
        fillOpacity:0.9
    }).addTo(map);

    marker.bindPopup(`
        <h3>${place.name}</h3>

        <b>${place.category}</b>

        <br><br>

        ${place.description}

        <hr>

        <b>Zugang:</b> ${place.legalAccess}<br>
        <b>Sicherheit:</b> ${place.safety}<br>
        <b>Entfernung:</b> ${place.distance} km
    `);

}

function renderTopPlaces(){

    const container = document.getElementById("topPlaces");

    container.innerHTML = "";

    places
    .sort((a,b)=>b.spectacular-a.spectacular)
    .slice(0,3)
    .forEach(place=>{

        container.innerHTML += `
        <div class="card">

            <h3>${place.name}</h3>

            <p>${place.category}</p>

            <p>⭐ ${place.spectacular}/10</p>

            <p>${place.legalAccess}</p>

        </div>
        `;

    });

}

function renderCategories(){

    const container = document.getElementById("categories");

    const categories = [...new Set(places.map(p=>p.category))];

    container.innerHTML = "";

    categories.forEach(cat=>{

        const amount = places.filter(p=>p.category===cat).length;

        container.innerHTML += `
            <div class="card">
                <h3>${cat}</h3>
                <p>${amount} Orte</p>
            </div>
        `;

    });

}

function renderStats(){

    const stats = document.getElementById("stats");

    const legal = places.filter(p=>p.legalAccess==="Ja").length;

    const partial = places.filter(p=>p.legalAccess==="Teilweise").length;

    const illegal = places.filter(p=>p.legalAccess==="Nein").length;

    stats.innerHTML = `

        <div class="card">

            <h3>${places.length}</h3>

            <p>Gesamtorte</p>

        </div>

        <div class="card">

            <h3>${legal}</h3>

            <p>Legal zugänglich</p>

        </div>

        <div class="card">

            <h3>${partial}</h3>

            <p>Teilweise zugänglich</p>

        </div>

        <div class="card">

            <h3>${illegal}</h3>

            <p>Nicht zugänglich</p>

        </div>

    `;

}

fetch("data/places.json")
.then(r=>r.json())
.then(data=>{

    places = data;

    places.forEach(createMarker);

    renderTopPlaces();

    renderCategories();

    renderStats();

});
