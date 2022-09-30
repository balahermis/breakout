var app = new window.Webex.Application();
const token = 'ZTNjZmVhZDgtNTczNC00ODIxLWEzNDAtODY1ZDY2NmVkMWJjYTY4YzA5NmYtYmQw_P0A1_87d196ed-78e2-4d2c-aa0d-942aced0610b';
const id = localStorage.getItem('bgcolor')

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



//oauth 

function oauth()







function log(type, data) {
    var ul = document.getElementById("console");
    var li = document.createElement("li");
    var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
    li.appendChild(payload)
    ul.prepend(li);
}


// enable the  breakoutsessions api

function update() {
    document.getElementById("formContainer").style.display = "block";
}

function Submit() {
    title = document.getElementById("title").value;
    password = document.getElementById("password").value;
    enabledBreakoutSessions = document.getElementById("enabledBreakoutSessions").value;

    const Res = {};

    const Backend = Object.create(Res);
    Backend.title = title;
    Backend.password = password;
    Backend.enabledBreakoutSessions = enabledBreakoutSessions;
    log('Submit()', Backend);

    updateMeetings(Backend)
}

function updateMeetings(data) {

    const myDateStart = new Date(Date.now() + (24000 * 60 * 60)).toISOString(); // 24 Hours from Now
    const myDateEnd = new Date(Date.now() + (25000 * 60 * 60)).toISOString(); // 25 Hours from Now
    const obj = {
        title: data.title,
        password: data.password,
        start: myDateStart,
        end: myDateEnd,
        enabledBreakoutSessions: data.enabledBreakoutSessions,
    }
    fetch(`https://webexapis.com/v1/meetings/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,
        },
        body: JSON.stringify(obj)
    }).then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}


//////  update the breackoutsessions name, invittes

function updateSessions() {
    document.getElementById("updateSessions").style.display = "block";
}
function updatesection() {
    const hostEmail = document.getElementById("hostEmail").value;
    const name = document.getElementById("name").value;
    const invitees = document.getElementById("invitees").value;
    const Res = {};
    console.log(hostEmail);
    const Backend = Object.create(Res);
    Backend.hostEmail = hostEmail;
    Backend.items = [
        {

            name: name,
            invitees: [
                invitees
            ]
        },]

    updateMeetingsBreakoutSessions(Backend)
}
function updateMeetingsBreakoutSessions(data) {

    console.log(data)
    const obj = {
        hostEmail: data.hostEmail,
        items: data.items,

    }


    fetch(`https://webexapis.com/v1/meetings/${id}/breakoutSessions`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,

        },
        body: JSON.stringify(obj)


    })
        .then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}



// get breakout rooms  list


function getSessions() {
    document.getElementById("GetMeetingSession").style.display = "block";
}
function getMeetingssection() {
    const hostEmail = document.getElementById("hostEmailu").value;
    const Res = {};
    console.log("hostEmail", hostEmail);
    const Backend = Object.create(Res);
    Backend.hostEmail = hostEmail;

    GetMeetingSessions(Backend)
}

function GetMeetingSessions(data) {

    const obj = JSON.stringify({
        hostEmail: data.hostEmail,

    })
    fetch(`https://webexapis.com/v1/meetings/${id}/breakoutSessions`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,
            'hostEmail': data.hostEmail,

        },
    })
        .then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}




