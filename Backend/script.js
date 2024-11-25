import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tlmksjidclgymgovixbn.supabase.co";
const supabaseKey =
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbWtzamlkY2xneW1nb3ZpeGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MDA1ODAsImV4cCI6MjA0Nzk3NjU4MH0
    .Sb6z90rkaWfzruKpC_Q9Z71z2OyI8ExqOgb8yuNEdUY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch movies from Supabase
async function fetchMovies() {
  try {
    const { data: movies, error } = await supabase
      .from("movies")
      .select("*")
      .order("rating", { ascending: false });

    if (error) throw error;

    populateTable(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
  }
}

// Populate the movie table
function populateTable(movies) {
  const tableBody = document.getElementById("movie-list");
  tableBody.innerHTML = ""; // Clear existing rows

  movies.forEach((movie, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}.</td>
            <td>${movie.series_title || "N/A"}</td>
            <td>${movie.released_year || "N/A"}</td>
            <td>${movie.rating || "N/A"}</td>
            <td>${movie.genre || "N/A"}</td>
            <td>${movie.notes || "N/A"}</td>
        `;
    tableBody.appendChild(row);
  });
}

// Fetch and display movies on page load
fetchMovies();
