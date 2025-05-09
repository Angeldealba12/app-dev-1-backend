const form = document.getElementById('movie-form');
const movieList = document.getElementById('movie-list');
const clearBtn = document.getElementById('clear-all');
let editId = null;

// Load movies on page load
document.addEventListener('DOMContentLoaded', loadMovies);

// CREATE or UPDATE
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const movie = {
        title: document.getElementById('title').value.trim(),
        director: document.getElementById('director').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        releaseYear: parseInt(document.getElementById('year').value),
        platform: document.getElementById('platform').value.trim()
    };

    const url = editId ? `/api/movies/${editId}` : '/api/movies';
    const method = editId ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        });
        const data = await res.json();
        if (data.success) {
            form.reset();
            editId = null;
            loadMovies();
        } else {
            alert(data.message || 'Error saving movie');
        }
    } catch (err) {
        console.error(err);
    }
});

// READ: Load and display all movies
async function loadMovies() {
    movieList.innerHTML = '';
    try {
        const res = await fetch('/api/movies');
        const data = await res.json();

        if (data.success) {
            data.data.forEach(renderMovie);
        } else {
            movieList.innerHTML = '<li>Failed to load movies</li>';
        }
    } catch (err) {
        console.error('Error loading movies:', err);
    }
}

// Helper: Display a movie
function renderMovie(movie) {
    const li = document.createElement('li');
    li.innerHTML = `
    <div>
      <strong>${movie.title}</strong> (${movie.releaseYear || 'N/A'})<br/>
      🎬 Directed by: ${movie.director || 'N/A'}<br/>
      🎭 Genre: ${movie.genre || 'N/A'}<br/>
      📺 Platform: ${movie.platform || 'N/A'}
    </div>
    <div>
      <button onclick="editMovie('${movie._id}', '${escapeStr(movie.title)}', '${escapeStr(movie.director)}', '${escapeStr(movie.genre)}', ${movie.releaseYear || 0}, '${escapeStr(movie.platform)}')">✏️</button>
      <button onclick="deleteMovie('${movie._id}')">🗑️</button>
    </div>
  `;
    movieList.appendChild(li);
}

// UPDATE: Load movie data into form
function editMovie(id, title, director, genre, year, platform) {
    document.getElementById('title').value = title;
    document.getElementById('director').value = director;
    document.getElementById('genre').value = genre;
    document.getElementById('year').value = year;
    document.getElementById('platform').value = platform;
    editId = id;
}

// DELETE one movie
async function deleteMovie(id) {
    if (!confirm('Delete this movie?')) return;

    try {
        const res = await fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            loadMovies();
        } else {
            alert('Error deleting movie');
        }
    } catch (err) {
        console.error(err);
    }
}

// DELETE all movies
clearBtn.addEventListener('click', async () => {
    if (!confirm('Clear all movies?')) return;

    try {
        const res = await fetch('/api/movies', {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            loadMovies();
        } else {
            alert('Failed to clear movies');
        }
    } catch (err) {
        console.error(err);
    }
});

// Escape single quotes and newlines for safe HTML attribute usage
function escapeStr(str) {
    return str.replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
