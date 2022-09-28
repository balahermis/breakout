const https = require('https');

function createMeeting(body) {

    const myDateStart = new Date(Date.now() + (24000 * 60 * 60)).toISOString();
    const myDateEnd = new Date(Date.now() + (25000 * 60 * 60)).toISOString();

    const bodyContent = JSON.stringify({
        title: body.tittle,
        start: myDateStart,
        end: myDateEnd,
        enabledBreakoutSessions: body.enabledBreakoutSessions,
        breakoutSessions: body.breakoutSessions

    })

    const options = {
        method: 'POST',
        hostname: 'webexapis.com',
        path: `/v1/meetings`,
        port: 443,
        headers: {
            Authorization: `Bearer ${"ZWU0YmQyMDgtYWEwYi00YTQ3LWE3NzktY2JjZmViYTE5NGI5YTQwYjc5YjQtM2Fk_P0A1_87d196ed-78e2-4d2c-aa0d-942aced0610b"}`,
            'Content-Type': 'application/json',
            'Content-Length': bodyContent.length,

        },
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(JSON.parse(data)); // https://nodejs.org/en/knowledge/javascript-conventions/what-is-json/
        });

        res.on('error', (e) => {
            console.error(`Error: ${e.message}`); // https://nodejs.org/api/errors.html#errormessage_1
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(bodyContent);

    req.end();
}
