/*
    Facebook authentication logic for this app. Please load JQuery before 
*/

let appId = '1113237095453404';
let stopWords = [];

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
    if (response.status === 'connect') {
        printMessage(true, "Logged in.")
    } else {
        FB.login(function(response) {
            if (response.status === 'conneted') {
                // Successfully logged in
                printMessage(true, "Logged in.")
                runAPI();
            } else if (response.status === 'not_authoried') {
                //
                printMessage(false, response.error.message)
            } else {
                //
            }
        }, { scope: 'public_profile,email,user_posts' });
    }
}

function runAPI() {
    FB.api('/me?fields=posts{description}', APICallback);
}

function APICallback(response) {
    if (response.error) {
        $('#status').html(response.error.message);
    }

    var filteredResults = [];
    var count = 0;
    var tempResult = response.posts;
    do {
        filteredResults.push(fetchData(tempResult.data, 'description'));
        count++;
        getPagingData(tempResult, 'next').always(function(res) {
            tempResult = res;
            console.log(res);
        });
    } while (count < 10)
    $('#status').html(JSON.stringify(filteredResults, null, 2));
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