function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
  }
  
  const API_URL = isLocalhost(location.hostname) ? 'http://localhost:3000' : '';
  
  window.addEventListener('DOMContentLoaded', function () {
    // TODO: Fetch all modules in the database from the Backend
    console.log("Start Axios get");
    var userid = JSON.parse(localStorage.getItem('userInfo'))[0].userid;
    axios.get(`${API_URL}/api/studentlist`)
      .then((response) => {
        console.log("response.data:", response.data);
        for (let i = 0; i < response.data.length; i++) {
          console.log(`response.data[${i}]`, response.data[i]);
          addToTable(
            response.data[i].AdminNo,
            response.data[i].StudentName,
            response.data[i].AttemptKera,
            response.data[i].AttemptPhoro
          );
        }
      });
  });
  