function isLocalhost(url) {
  return url.includes('localhost') || url.includes('127.0.0.1');
}

const API_URL = isLocalhost(location.hostname) ? 'http://localhost:3000' : '';

window.addEventListener('DOMContentLoaded', function () {
  // TODO: Fetch all modules in the database from the Backend
  console.log("Start Axios get");
  //var userid = JSON.parse(localStorage.getItem('userInfo'))[0].userid;
  axios.get(`${API_URL}/api/studentlist/`)
    .then((response) => {
      console.log("response.data:", response.data);
      for (let i = 0; i < response.data.length; i++) {
        console.log(`response.data[${i}]`, response.data[i]);
        addToTable(
          // .[Take From Database]
          response.data[i].AdminNo,
          response.data[i].StudentName,
          response.data[i].AttemptKeratometer,
          response.data[i].AttemptPhoropter,
          response.data[i].CompletedKeratometer,
          response.data[i].CompletedPhoropter,
        );
      }
    });

  const clearTableButton = document.getElementById('clearButton');

  // Add event listener to the "Clear Table" button
  clearTableButton.addEventListener('click', confirmClearTable);

  // Function to handle the "Clear Table" button click
  function confirmClearTable(event) {
    event.preventDefault();
    console.log("Button clicked!");

    // Display a confirmation dialog
    const confirmation = confirm("Are you sure you want to clear the table?");

    if (confirmation) {
      clearTable();
    }
  }

  // Function to clear the table
  function clearTable() {
    axios.post(`${API_URL}/api/studentlist/`)
      .then(response => {
        // Handle successful response, if required
        console.log(response.data);
        // Refresh the page
        window.location.reload();
      })
      .catch(error => {
        // Handle error response, if required
        console.error(error);
      });
  }
});
