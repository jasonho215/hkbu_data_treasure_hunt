function printMessage(status, message) {
    let statusResult = '';
    if (typeof status === 'boolean') {
        statusResult = status ? ' OK ' : 'FAIL';
    } else {
        statusResult = status.ToString();
    }
    console.log('[' + statusResult + ']' + ' ' + message);
}

function loadScript(url) {
    if (Array.isArray(url)) {
        var self = this;
        var promises = [];

        url.forEach(function(u) {
            promises.push(self.loadScript(u));
        });
        return Promise.all(promises);

    }

    var singlePromise = new Promise(function(resolve, reject) {
        var r = false,
            t = document.getElementsByTagName("head")[0],
            s = document.createElement("script");

        s.type = "text/javascript";
        s.src = url;
        s.async = true;
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == "complete")) {
                r = true;
                resolve(this);
            }
        };
        s.onerror = s.onabort = reject;
        t.appendChild(s);
    })
    return singlePromise;
}