// let API_URL = (url) => {
//     return ((url.includes('localhost') || url.includes('127.0.0.1')) != true ? 'https://derpe.azurewebsites.net' : 'http://localhost:3000');
// }


function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}

API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');