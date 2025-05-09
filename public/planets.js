const form = document.getElementById('planet-form');
const planetList = document.getElementById('planets-display');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const order = parseInt(document.getElementById('order').value);
    const hasRings = document.getElementById('hasRings').checked;

    const planet = { name, orderFromSun: order, hasRings };

    try {
        const res = await fetch('/api/planets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planet)
        });

        const data = await res.json();
        if (data.success) {
            addPlanetToList(data.data);
            form.reset();
        } else {
            alert('Failed to add planet');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});


function addPlanetToList(planet) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${planet.name}</strong> - ${planet.orderFromSun} from the sun ${planet.hasRings ? '(Has rings)' : '(No rings)'}`;
    planetList.appendChild(li);
}

document.addEventListener('DOMContentLoaded', loadPlanets);

// Load saved planets when the page loads
async function loadPlanets() {
    try {
        const res = await fetch('/api/planets');
        const data = await res.json();

        if (data.success) {
            data.data.forEach(addPlanetToList);
        } else {
            console.error("Failed to load planets:", data.message);
        }
    } catch (err) {
        console.error("Error fetching planets:", err);
    }
}

document.addEventListener('DOMContentLoaded', loadPlanets);
