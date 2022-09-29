var app = new window.Webex.Application();

app.onReady().then(function () {
    console.log('App is ready. App info:', app);
});


function handleGetMeeting() {
    app.context.getMeeting().then((m) => {
        log('getMeeting()', m);
        console.log(m)
        localStorage.setItem('bgcolor', m.id);

    }).catch((error) => {
        log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
    });
}

function log(type, data) {
    var ul = document.getElementById("console");
    var li = document.createElement("li");
    var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
    li.appendChild(payload)
    ul.prepend(li);
}



