let API_URL = (url) => {
    return ((url.includes('localhost') || url.includes('127.0.0.1')) != true ? 'https://derpe.azurewebsites.net' : 'http://localhost:3000');
}