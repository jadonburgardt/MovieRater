import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tlmksjidclgymgovixbn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch movies from Supabase
async function fetchMovies() {
  const { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("rating", { ascending: false }); // Sort by rating, highest to lowest

  if (error) {
    console.error("Error fetching movies:", error);
    return;
  }

  populateTable(movies);
}

// Populate the movie table
function populateTable(movies) {
  const tableBody = document.getElementById("movie-list");
  tableBody.innerHTML = ""; // Clear existing rows

  movies.forEach((movie, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}.</td>
            <td>
                ${movie.series_title}
                <div class="movie-details">
                    <p>Director: ${movie.director}</p>
                    <p>Year: ${movie.released_year}</p>
                    <p>Duration: ${movie.duration} min</p>
                </div>
            </td>
            <td>${
              movie.created_at
                ? new Date(movie.created_at).toLocaleDateString()
                : "N/A"
            }</td>
            <td>${movie.rating || "N/A"}</td>
            <td>${movie.genre}</td>
            <td class="notes">${movie.notes || "N/A"}</td>
            <td><button class="edit-button">Edit</button></td>
        `;
    tableBody.appendChild(row);
  });
}

// Fetch movies when the page loads
fetchMovies();
