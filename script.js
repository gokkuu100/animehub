document.getElementById('anime-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let searchTerm = document.getElementById('search').value;
  displayAnimes();
});

function displayAnimes() {
  let url = 'http://localhost:3000/animes';
  fetch(url)
      .then(res => res.json())
      .then(animes => {
          let mainDisplay = document.querySelector('#mainDisplay');
          mainDisplay.innerHTML = ''; // Clear previous content
          for (let anime of animes) {
              let animeElement = document.createElement('ul');
              animeElement.innerHTML = `
                  <li class="aniPoster" data-anime-id="${anime.id}">
                      <img src="${anime.poster}" alt="${anime.title}">
                      <h2>${anime.title}</h2>
                      <p>Released: ${anime.release_date}</p>
                      <p>Rating: ${anime.rating}</p>
                      <p>Episodes: ${anime.episodes}</p>
                  </li>
              `;
              mainDisplay.appendChild(animeElement);
          }

          // Add event listener for anime posters
          let animePosters = document.querySelectorAll('.aniPoster');
          animePosters.forEach(poster => {
              poster.addEventListener('click', function (e) {
                  e.preventDefault();
                  let animeId = poster.getAttribute('data-anime-id');
                  displayMerchandise(animeId);
              });
          });
      });
}

function displayMerchandise(animeId) {
  let url = `http://localhost:3000/animes/${animeId}`;
  fetch(url)
      .then(res => {
          if (res.ok) {
              return res.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(anime => {
          let merchDisplay = document.querySelector('#mainDisplay');
          merchDisplay.innerHTML = ''; // Clear previous content
          if (anime.merchandise && anime.merchandise.length > 0) {
              anime.merchandise.forEach(item => {
                  let merchElement = document.createElement('ul');
                  merchElement.innerHTML = `
                      <h2>${item.product_name}</h2>
                      <img src="${item.image}" alt="${item.product_name}">
                      <p>Description: ${item.product_description}</p>
                      <p>Price: $${item.price}</p>
                      <p>Category: ${item.product_type}</p>
                      <button>Buy</button>
                  `;
                  merchDisplay.appendChild(merchElement);
              });
          } else {
              merchDisplay.innerHTML = '<p>No merchandise available for this anime.</p>';
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
}


// Initial load of animes
displayAnimes();
