function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}
//var window = this.window;

API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');
const txtHost = document.getElementById("hostname");
console.log("window.location.hostname", location.hostname);

window.addEventListener('DOMContentLoaded', function () {
    //TODO: Fetch all modules in the database from the Backend
    console.log("Start Axios get")

    axios.get(API_URL+'/api/allSlime', {})
        .then((response) => {
            console.log("response.data:", response.data)

            for (let i = 0; i < response.data.length; i++) {
                console.log("response.data:[" + i + "]", response.data[i])
                addToTable(
                    response.data[i].slime_id,
                    response.data[i].slime_name,
                    response.data[i].slime_type,
                    response.data[i].slime_move1,
                    response.data[i].slime_move2,
                    response.data[i].slime_move3,
                    response.data[i].slime_health,
                    response.data[i].weakness)
            }
        })

    //TODO: Add each row returned onto the HTML table using the addToTable function found in ../helper.js
});