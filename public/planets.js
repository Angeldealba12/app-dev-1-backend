const form = document.getElementById('planet-form');
const planetList = document.getElementById('planets-display');
let editingPlanetId = null;

// Submit handler for create/update
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const orderFromSun = parseInt(document.getElementById('order').value);
    const hasRings = document.getElementById('hasRings').checked;

    if (!name || isNaN(orderFromSun)) {
        alert("Please fill out all fields.");
        return;
    }

    const planetData = { name, orderFromSun, hasRings };

    try {
        let res;
        if (editingPlanetId) {
            // Update
            res = await fetch(`/api/planets/${editingPlanetId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planetData)
            });
        } else {
            // Create
            res = await fetch('/api/planets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planetData)
            });
        }

        const data = await res.json();
        if (data.success) {
            form.reset();
            editingPlanetId = null;
            loadPlanets(); // Refresh list
        } else {
            alert(data.message || 'Something went wrong');
        }
    } catch (err) {
        console.error('Submit error:', err);
    }
});

// Load all planets on page load
async function loadPlanets() {
    planetList.innerHTML = '';
    try {
        const res = await fetch('/api/planets');
        const data = await res.json();

        if (data.success) {
            data.data.forEach(addPlanetToList);
        }
    } catch (err) {
        console.error("Load error:", err);
    }
}

// Add planet to the DOM
function addPlanetToList(planet) {
    const li = document.createElement('li');
    li.innerHTML = `
    <strong>${planet.name}</strong> - ${planet.orderFromSun} from the sun ${planet.hasRings ? '(Has rings)' : '(No rings)'}
    <button onclick="editPlanet('${planet._id}', '${planet.name}', ${planet.orderFromSun}, ${planet.hasRings})">✏️ Edit</button>
    <button onclick="deletePlanet('${planet._id}')">🗑️ Delete</button>
  `;
    planetList.appendChild(li);
}

// Edit
function editPlanet(id, name, orderFromSun, hasRings) {
    document.getElementById('name').value = name;
    document.getElementById('order').value = orderFromSun;
    document.getElementById('hasRings').checked = hasRings;
    editingPlanetId = id;
}

// Delete one
async function deletePlanet(id) {
    if (!confirm("Are you sure you want to delete this planet?")) return;
    try {
        const res = await fetch(`/api/planets/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            loadPlanets();
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// Clear all
document.getElementById('clear-all').addEventListener('click', async () => {
    if (!confirm("Clear ALL planets?")) return;
    try {
        const res = await fetch('/api/planets', {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            loadPlanets();
        }
    } catch (err) {
        console.error("Clear all error:", err);
    }
});

document.addEventListener('DOMContentLoaded', loadPlanets);
