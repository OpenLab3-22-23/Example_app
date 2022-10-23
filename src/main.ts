import './style.css';

document.getElementById('app')!.innerHTML = `
  <div class="search-container container-lg mx-auto bg-slate-400 rounded-lg my-2">
  </div>
  <div class="results-container container-lg mx-auto">
  </div>
`;

// Creating of Form element
const form = document.createElement("form");
form.id = "myForm";

// Creating of Input element
const searchInput = document.createElement("input");
searchInput.id = "imageCategory";
searchInput.type = "text";
searchInput.name = "imageCategory";

// Creating of Submit button
const submitButton = document.createElement("button");
submitButton.textContent = "Search";
submitButton.id = "submitForm";
submitButton.name = "submitButton";
submitButton.className = "bg-orange-500 rounded";

// Appending elements to page
form.appendChild(searchInput);
form.appendChild(submitButton);
document.querySelector<HTMLDivElement>(".search-container")!.appendChild(form);

function renderImages(imgs: any) {
  const results = document.querySelector('.results-container')!;
  if (!imgs.length) {
    const noPicsMsg = document.createElement('p');
    noPicsMsg.textContent = "No Images available";
    results.appendChild(noPicsMsg);
  } else {
    const imgsToRender = [];
    for (const pic of imgs) {
      const picEl = document.createElement('img');
      picEl.setAttribute('src', pic.src.medium);
      imgsToRender.push(picEl);
    }
    for (const img of imgsToRender) {
      results.appendChild(img);
    }
  }
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://api.pexels.com/v1/search?query=people&per_page=10", {
    method: "get",
    headers: new Headers({
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderImages(data.photos);
    })
    .catch(error => console.log(error));
});