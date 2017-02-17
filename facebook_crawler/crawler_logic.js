/*
    Facebook authentication logic for this app. Please load JQuery before 
*/


let messageCount = 0;
const targetMessageNumber = 1000;
let allFilteredMessage = [];


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

function checkLoginState() {
    FB.getLoginStatus(updateStatusCallback);
}

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

function runAPI() {
    reset();
    FB.api('me/posts?fields=description', APICallback);
}

function APICallback(response) {
    recursiveGetData(response, function(message) {
        $('#status').empty();
        $('#status').html(message);
    })
}

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