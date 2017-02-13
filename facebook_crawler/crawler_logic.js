/*
    Facebook authentication logic for this app. Please load JQuery before 
*/

let appId = '217715905321401';
let stopWords = [];

function AddExternals() {
    if (typeof window.jQuery === 'function') {
        var jq = document.createElement("script");
        jq.type = "text/javascript";
        jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(jq);
        console.log("Added jQuery!");
    } else {
        console.log("jQuery already exists.")
    }
}
AddExternals();

function updateStatusCallback(response) {
    if (response.status === 'connect') {
        console.log("logged in, good");
    } else {
        FB.login(function(response) {
            if (response.status === 'conneted') {
                // Successfully logged in
                runAPI();
            } else if (response.status === 'not_authoried') {
                //
            } else {
                //
            }
        }, { scope: 'public_profile,email,user_posts' });
    }
}

function runAPI() {
    FB.api('/me', APICallback);
}

function APICallback(response) {
    if (response.error) {
        $('#status').html(response.error.message);
    }
    $('#status').html('Thanks for logging in, ' + response.name + '!');
}

function checkLoginState() {
    FB.getLoginStatus(updateStatusCallback);
}

function getPagingData(graphEdge, action) {
    if (typeof action !== 'string' || typeof graphEdge !== 'object') {
        return null;
    } else if (!graphEdge.hasOwnProperty('paging') || action !== 'previous' || action !== 'next') {
        return null;
    }
    var link;
    try {
        link = graphEdge.paging[action];

    } catch (e) {
        link = '';
    } finally {
        if (link.length == 0) return null;

        return $.getJSON(link);
    }
}

// function fetchData( data, filter) {
//     if (typeof data != Array)
//         return null;
//     data.forEach(function(element) {
//         if (typeof element == Object) {
//             for( const key of Object.keys(element)) {

//             }
//         }
//     }, this);
// }