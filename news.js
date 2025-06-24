
// const apikey = "b8b99ab35803410f931ac8a4c9d751e3";
//   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;

const apiKey = "b8b99ab35803410f931ac8a4c9d751e3";
const searchBtn = document.querySelector(".button");
const searchInput = document.getElementById("input_news");
const newsContainer = document.getElementById("newsCards");


searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        getNews(query);
    } else {
        alert("Kuch likho pehle search bar mein!");
    }
});


function getNews(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&pageSize=9&apiKey=${apiKey}`;

    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {

          console.log(data);
            if (data.articles.length === 0) {
                newsContainer.innerHTML = "<p>No news found </p>";
                return;
            }

            showNews(data.articles);
        })
        .catch(error => {
            console.log("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Oops! Koi dikkat ho gayi </p>";
        });
}


function showNews(articles) {
    newsContainer.innerHTML = ""; // Clear old news

    articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card_header">
                <img src="${article.urlToImage || '../news/news_assets/new.jpg'}" alt="news_image" class="card_news">
            </div>
            <div class="card_content">
                <h3>${article.title}</h3>
                <h6>${article.source.name}</h6>
                <p>${article.description}</p>
                <a href="${article.url}">Padhne ke liye yahan click karo </a>
            </div>`;

        newsContainer.appendChild(card);
    });
}   