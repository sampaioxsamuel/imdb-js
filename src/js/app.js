const searchInput = document.querySelector('[data-search^="input"]');
const backgroundImg = document.querySelector("[data-bg]");
const searchContainer = document.querySelector('[data-search^="container"]');
const resultContainer = document.querySelector("[data-result]");

const nextBtn = document.querySelector("[data-next]");
const previousBtn = document.querySelector("[data-previous]");

const backgroundUrl = (url) =>
	`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${url}`;
const posterUrl = (url) =>
	`https://image.tmdb.org/t/p/w600_and_h900_bestv2${url}`;
const theMovieDB = (name, API_KEY) =>
	fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}`);

let mvNumber = 0;

function nextMovie() {
	
		if(mvNumber > 18){
			nextBtn.classList.add("disable");
		}else{
			resultContainer.innerHTML = "";
			mvNumber++;
			previousBtn.classList.remove("disable");
			showMovie(mvNumber);
		}
}

function previousMovie() {
	if (mvNumber >= 1) {
		mvNumber--;
		resultContainer.innerHTML = "";
		showMovie(mvNumber);
		nextBtn.classList.remove("disable");
	} else {
		previousBtn.classList.add("disable");
	}
}

function showMovie(movieNumber) {
	const movieDiv = document.createElement("div");
	const poster = document.createElement("img");
	const title = document.createElement("h2");
	const year = document.createElement("p");
	const overview = document.createElement("p");

	const movieName = searchInput.value;

	theMovieDB(movieName, API_KEY)
		.then((response) => response.json())
		.then((movieFound) => {
			if(typeof(movieFound.results[mvNumber]) === 'undefined'){
				nextBtn.classList.add("disable");
			}
			const movieTitle = movieFound.results[movieNumber].title;
			const movieOverview = movieFound.results[movieNumber].overview;
			const moviePoster =
				movieFound.results[movieNumber].poster_path || null;
			const releaseDate = JSON.stringify(
				movieFound.results[movieNumber].release_date
			)
				.split("-")[0]
				.replace('"', " ");
			const backdrop = movieFound.results[movieNumber].backdrop_path;

			title.innerText = movieTitle;
			year.innerText = releaseDate;
			overview.innerText = movieOverview;

			poster.setAttribute(
				"src",
				moviePoster
					? posterUrl(moviePoster)
					: "https://dummyimage.com/600x900/000/fff.png&text=No+Cover"
			);
			poster.classList.add("movie__cover");
			title.classList.add("movie__title");
			year.classList.add("movie__year");
			overview.classList.add("movie__about");

			movieDiv.append(title);
			movieDiv.append(year);
			movieDiv.append(poster);
			movieDiv.append(overview);

			backgroundImg.style.background = `url(${backgroundUrl(backdrop)})`;
			resultContainer.append(movieDiv);
		});
}

searchInput.addEventListener("keydown", () => {
	if (event.key === "Enter") {
		if (searchInput.value === "") {
			alert("input empty");
			searchInput.classList.add('erro')
			setTimeout(() => {
				searchInput.classList.remove('erro')
			}, 2000)
		} else {
			searchContainer.classList.add("hidden");
			showMovie(mvNumber);
			nextBtn.style.display = "initial";
			previousBtn.style.display = "initial";

			nextBtn.addEventListener("click", nextMovie)
			previousBtn.addEventListener("click", previousMovie);
		}
	}
});