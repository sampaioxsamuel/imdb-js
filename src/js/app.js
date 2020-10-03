import Modal from './modal.js';

const searchInput = document.querySelector('[data-search^="input"]');
const backgroundImg = document.querySelector('[data-bg]');
const searchContainer = document.querySelector('[data-search^="container"]');
const resultContainer = document.querySelector('[data-result]');

const nextBtn = document.querySelector('[data-next]');
const previousBtn = document.querySelector('[data-previous]');

const backgroundUrl = (url) => `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${url}`;
const posterUrl = (url) => `https://image.tmdb.org/t/p/w600_and_h900_bestv2${url}`;
const theMovieDB = (name, API_KEY) => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&language=pt-BR&en-US`);

const movieNotFound = new Modal('Você precisa digitar o nome de um filme!', 'Tentar novamente');
const firstMovie = new Modal('Você já está no primeiro filme encontrado!', 'Fechar');

let mvNumber = 0;
const API_KEY = '1e88c37294fd306d24ce026847af1405'; // GET YOUR API KEY IN themoviedb.org;

previousBtn.classList.add('disable');

function showMovie(movieNumber) {
  const movieDiv = document.createElement('div');
  const poster = document.createElement('img');
  const title = document.createElement('h2');
  const year = document.createElement('p');
  const overview = document.createElement('p');

  const movieName = searchInput.value;

  theMovieDB(movieName, API_KEY)
    .then((response) => response.json())
    .then((movieFound) => {
      
      if (typeof movieFound.results[mvNumber + 1] === 'undefined') {
        nextBtn.classList.add('disable');
      }
      
      const backdrop = movieFound.results[movieNumber].backdrop_path;
      const movieTitle = movieFound.results[movieNumber].title;
      const movieOverview = movieFound.results[movieNumber].overview;
      const moviePoster = movieFound.results[movieNumber].poster_path;
      const movieDate = movieFound.results[movieNumber].release_date;

      const finalYearRelease = typeof movieDate === 'undefined'
        ? 'Data de Lançamento Desconhecida'
        : movieDate.split('-')[0];

      title.innerText = movieTitle;
      year.innerText = finalYearRelease;
      overview.innerText = movieOverview;

      poster.setAttribute(
        'src',
        moviePoster
          ? posterUrl(moviePoster)
          : 'https://dummyimage.com/600x900/000/fff.png&text=No+Cover',
      );

      poster.classList.add('movie__cover');
      title.classList.add('movie__title');
      year.classList.add('movie__year');
      overview.classList.add('movie__about');

      movieDiv.append(title);
      movieDiv.append(year);
      movieDiv.append(poster);
      movieDiv.append(overview);

      backgroundImg.style.background = `url(${backgroundUrl(backdrop)})`;
      backgroundImg.style.backgroundRepeat = 'no-repeat';
      resultContainer.append(movieDiv);
    })
    .catch(() => {
      
      window.location.reload();
    });
}

function nextMovie() {
  resultContainer.innerHTML = "";
  mvNumber += 1;
  showMovie(mvNumber);
  previousBtn.classList.remove("disable");
	
}

function previousMovie() {
  if (mvNumber < 1){
    console.log('entrou')
    previousBtn.classList.add("disable");
  } else {
    resultContainer.innerHTML = "";
    mvNumber -= 1;
    showMovie(mvNumber);
  }
}


searchInput.addEventListener('keydown', ({key}) => {
  if (key === 'Enter') {
    if (searchInput.value === '') {
      document.body.appendChild(movieNotFound.createElement());

      searchInput.classList.add('erro');
      setTimeout(() => {
        searchInput.classList.remove('erro');
      }, 2500);
    } else {
      searchContainer.classList.add('hidden');
      showMovie(mvNumber);

      nextBtn.style.display = 'initial';
      previousBtn.style.display = 'initial';

      nextBtn.addEventListener('click', nextMovie);
      previousBtn.addEventListener('click', previousMovie);
    }
  }
});
