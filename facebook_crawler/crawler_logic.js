/*
    Facebook authentication logic for this app. Please load JQuery before 
*/

// Counter for collected and processed messages.
let messageCount = 0;

// Temp storage for processed messages.
let allFilteredMessage = [];

// Facebook Graph API Path. You may test it in the Graph API Explorer 
// and then copy request link field to replace the value of this variable (qouted in single quotes)
let apiPath = 'me/posts?fields=description'

// Method for loading external scripts, no need to modify.
function AddExternals() {

    if (typeof window.jQuery === 'function') {
        printMessage(true, 'jQuery exists');
        return;
    }

    let url = [
        'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'
    ];
    var prom = loadScript(url);

    prom.then(function(response) {
            printMessage(true, 'Added ' + response);
        },
        function(error) {
            printMessage(false, 'Network Error : ' + error);
        });
    return;

    /*
    if (typeof window.jQuery !== 'function') {
        var jq = document.createElement("script");
        jq.type = "text/javascript";
        jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(jq);
        console.log("Added jQuery!");
    } else {
        console.log("jQuery already exists.")
    }
    */
}

// For Facebook Login, no need to modify.
function checkLoginState() {
    FB.getLoginStatus(updateStatusCallback);
}

// For Facebook Login, no need to modify.
function updateStatusCallback(response) {
    if (response.status === 'connected') {
        printMessage(true, "Logged in.");
        $('#run_btn').removeAttr('disabled');

    } else {
        FB.login(function(response) {
            if (response.status === 'connected') {

                // Successfully logged in
                printMessage(true, "Logged in.")
                $('#run_btn').removeAttr('disabled');

            } else if (response.status === 'not_authoried') {
                // Not authorized for using this Facebook application
                printMessage(false, response.error.message)
            } else {
                // Other cases, should not be handled by this program
                printMessage(false, response.error.message)
            }
        }, { scope: tokenAccessRight.join(',') });
    }
}

// Trigger for the fetching process.
function runAPI() {
    reset();
    FB.api(apiPath, APICallback);
}

// Main Logic for fetching the data
// You should modify this method based on the result tested in the Graph API Explorer.
function APICallback(response) {
    recursiveGetData(response, function(message) {
        // Works for showing the processed data.
        $('#status').empty();
        $('#status').html(message);
    })
}

// Recursively get data from facebook.
function recursiveGetData(response, howToDisaply) {
    // Unexpected leaving condition.
    if (response.error) {
        howToDisaply(response.error.message);
        return;
    }

    // Leave The function if I get enough message.
    if (messageCount > targetMessageNumber) {
        return;
    }
    // Some porcessing on the data from Facebook.
    let dataArray = response.data;
    let filteredResults = fetchData(dataArray, 'description')
    messageCount += dataArray.length;;

    // Aggregrate them to global variable.
    allFilteredMessage = allFilteredMessage.concat(filteredResults);

    // Display Output
    howToDisaply(JSON.stringify(allFilteredMessage, null, 2));

    // Recursively get the data again.
    let handle = getPagingData(response, 'next');
    if (handle) {
        handle.always(recursiveGetData);
    }
}

// Get data based on the paging property of JSON returned by Facebook Graph API. No need to modify.
function getPagingData(graphEdge, action) {
    if (typeof action !== 'string' || typeof graphEdge !== 'object') {
        return null;
    } else if (!graphEdge.hasOwnProperty('paging')) {
        return null;
    }
    var link;
    try {
        link = graphEdge.paging[action];

    } catch (e) {
        link = '';
    } finally {
        if (link.length == 0) return null;
        return $.getJSON(link)
            .done(function(data) {
                printMessage(true, "GET Request to: " + link);

            })
            .fail(function(jqxhr, textError, error) {
                let errorMessage = textError + ", " + error;
                printMessage(false, "GET Request Error: " + errorMessage);
            })
    }
}

// Get required field from JSON returned by Facebook Graph API.
// parameters:
//      data    ->  JSON returned
//      filter  ->  Field that required and it will be filtered.
function fetchData(data, filter) {
    if (!Array.isArray(data)) {
        return null;
    }

    var results = [];
    data.forEach(function(element) {
        if (typeof element == 'object') {
            for (const key of Object.keys(element)) {
                if (key === filter) {
                    let result = removeStopWords(element[key]);
                    results.push(result);
                }
            }
        }
    }, this);
    return results;
}

// For removing unwanted words from string.
// Can be modifed based on you own stragety, usually there is no need to modify it.
function removeStopWords(element) {
    var result = [];
    var spilted = element.split(' ');
    spilted.forEach(function(word) {
        stopWords.forEach(function(stopWord) {
            if (stopWord === word) {
                return;
            }
        });
        result.push(word);
    });
    return result.join(' ');
}

/**
 * Reset all the variables for run the API again
 */
function reset() {
    messageCount = 0;
    allFilteredMessage.length = 0;
}