let API_URL = (url) => {
    return ((url.includes('localhost') || url.includes('127.0.0.1')) != true ? 'https://spoc-simulation.onrender.com/' : 'http://localhost:3000');
}


