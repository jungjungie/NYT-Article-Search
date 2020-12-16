$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // Variables
    let searchTerm = $("#search-term").val();
    console.log(searchTerm);

    let APIKey = "DzliZA1M6qFMknm0cAveX1iQqQOLOCpy";
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (articleData) {
        console.log(articleData);
    })
})