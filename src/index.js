const init = () => {
    const inputForm = document.querySelector("form");
  
    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.querySelector("input#searchByID");
  
      console.log("🔍 Ищем фильм с ID:", input.value);
  
      fetch(`http://localhost:3000/movies/${input.value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Фильм с ID ${input.value} не найден`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("🎬 Найден фильм:", data);
          updateMovieDetails(data);
        })
        .catch((error) => {
          console.error("❌ Ошибка запроса:", error);
          showError(`Фильм с ID ${input.value} не найден.`);
        });
    });
  };
  
  function updateMovieDetails(movie) {
    const title = document.querySelector("section#movieDetails h4");
    const summary = document.querySelector("section#movieDetails p");
  
    title.innerText = movie.title;
    summary.innerText = movie.summary;
  }
  
  function showError(message) {
    const title = document.querySelector("section#movieDetails h4");
    const summary = document.querySelector("section#movieDetails p");
  
    title.innerText = "Ошибка!";
    summary.innerText = message;
  }
  
  document.addEventListener("DOMContentLoaded", init);