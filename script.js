$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // HTML Variables
    let searchTerm = $("#search-term").val().trim();
    console.log(searchTerm);
    let numberOfRecords = $("#records").val().trim();
    let startYear = $("#start-year").val().trim();
    let endYear = $("#end-year").val().trim();

    // API Variables
    let APIKey = "DzliZA1M6qFMknm0cAveX1iQqQOLOCpy";
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + APIKey;

    // AJAX call to retrieve articles
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (articleData) {
        console.log(articleData);

        // headline
        // author
        // Publish date
        // url
        // snippet
    })
})