// Function to clear search form
function clearResults() {
    // Clears search fields
    $("#search-term").val("");
    $("#records").val("1");
    $("#start-year").val("");
    $("#end-year").val("")

    // Clears search results
    $("#search-results").empty();
    $("#results-section").attr("class", "hide");
}

// Function kicks off when search button is clicked
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // HTML Variables
    let searchTerm = $("#search-term").val().trim();
    let numberOfRecords = $("#records").val();
    let startYear = $("#start-year").val().trim();
    let endYear = $("#end-year").val().trim();
    let startDate = "";
    let endDate = "";

    // Show error messages if the search term field is empty
    if (searchTerm === "") {
        $("#search-term-error").attr("class", "show error-msg");
        return;
    } 

    // Hide any error messages that are showing
    $("#search-term-error").attr("class", "hide");
    $("#records-error").attr("class", "hide");
    $("#start-year-error").attr("class", "hide");
    $("#end-year-error").attr("class", "hide");

    // If the start year and end year fields are not empty, then set the startDate and endDate variables (to be added to the queryURL);
    if (startYear !== "" && endYear !== "") {
        startDate = "&facet_fields=begin_date=" + startYear + "0101";

        endDate = "&end_date=" + endYear + "1231";
        
        // console.log(startDate);
        // console.log(endDate)
    
    // If the start year is filled out but the end year is not, then show an error message
    } else if (startYear !== "" && endYear === "") {
        $("#end-year-error").attr("class", "show error-msg");
        return;

    // If the end year is filled out but the start year is not, then show an error message
    } else if (startYear === "" && endYear !== "") {
        $("#start-year-error").attr("class", "show error-msg");
        return;
    }

    // Clears the search form and results
    clearResults();

    // API Variables
    let APIKey = "DzliZA1M6qFMknm0cAveX1iQqQOLOCpy";
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + startDate + endDate + "&api-key=" + APIKey;

    // AJAX call to retrieve articles based on search parameters
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (articleResults) {
        let articleData = articleResults.response.docs;
        console.log(articleData);

        // Display the search results section
        $("#results-section").attr("class", "card shadow-sm show");

        // Loop through the results for the number of times set in the search parameters
        for (let i = 0; i < numberOfRecords; i++) {

            // Create a new div and new elements for each search result
            let resultCard = $("<div>").attr("class", "card p-4 result-cards");

            let headline = $("<h3>").text(articleData[i].headline.main);
            let author = $("<p>").text(articleData[i].byline.original).attr("class", "author");
            let date = $("<p>").text("Published on " + moment(articleData[i].pub_date).format('MMMM Do YYYY')).attr("class", "info-text");
            let summary = $("<p>").text(articleData[i].snippet);
            let url = $("<a>").text("Read the full article here.").attr("href", articleData[i].web_url).attr("target", "_blank");

            // Append new elements to new resultCard div
            resultCard.append(headline, author, date, summary, url);

            // Append resultCard div to the "#search-results" div
            $("#search-results").append(resultCard);
        }
    })
})

// Top Articles section clears when the "clear results" button is clicked
$("#clearBtn").on("click", clearResults);