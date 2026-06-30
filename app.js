const map = L.map("map").setView([51.65, 6.62], 9);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap-Mitwirkende"
    }
).addTo(map);

document
.getElementById("darkModeBtn")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

fetch("data/places.json")
.then(r=>r.json())
.then(data=>{

    console.log(data);

});
