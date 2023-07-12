function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}
//var window = this.window;

API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');
const txtHost = document.getElementById("hostname");
console.log("window.location.hostname", location.hostname);

window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const slime_name = form.querySelector('input[name=slimeName]').value;
        const slime_type = form.querySelector('select[name=slimeType]').value;
        const move_name1 = form.querySelector('select[name=move_name1]').value;
        const move_name2 = form.querySelector('select[name=move_name2]').value;
        const move_name3 = form.querySelector('select[name=move_name3]').value;
        const slime_health = form.querySelector('input[name=slime_health]').value;
        const weakness = form.querySelector('select[name=weakness]').value;
        const image = form.querySelector('input[name=image]')

        const allInput = form.querySelectorAll('input, button[type=submit]');

        // Disable inputs
        allInput.forEach((input) => {
            input.disabled = true;
        });

        axios.post(API_URL+'/api/allSlime/', {
            slime_name: slime_name,
            slime_type: slime_type,
            slime_move1: move_name1,
            slime_move2: move_name2,
            slime_move3: move_name3,
            slime_health: slime_health,
            weakness: weakness,
            image: image
        })
            .then((response) => {
                if (response.status == 201) return response.data; // parse body as JSON string
            })
            .then(function (body) {
                if (!body) return; // If successfully created, body will be empty
                alert(body.error); // else there's an error
                return;
            })
            .finally(function () {
                // Enable inputs
                allInput.forEach((input) => {
                    input.disabled = false;
                });
            });
    };
});



// Dynamic dropdown
// axios.get('http://localhost:3000/api/moves/getMoves')
//     .then(function (response) {
//         var select1 = document.getElementById("move1");
//         var select2 = document.getElementById("move2");
//         var select3 = document.getElementById("move3");
//         var options = response.data;
//         options.forEach(function (option) {
//             console.log("Data", option)
//             var opt = option.move_name;
//             var el = document.createElement("option");
//             el.textContent = opt;
//             el.value = opt;
//             select1.appendChild(el.cloneNode(true));
//             select2.appendChild(el.cloneNode(true));
//             select3.appendChild(el.cloneNode(true));
//         });
//     })
//     .catch(function (error) {
//         console.error(error);
//     });

// const slime_name = document.getElementById("slimeName").value
// const slime_type = document.getElementById("slimeType").value
// const slime_health = document.getElementById("slime_health").value
// const weakness = document.getElementById("weakness").value
// const image = document.getElementById("image").value

// document.getElementById("submit").addEventListener("click", function () {
//     axios.post('http://localhost:3000/api/allSlime/', {
//         slime_name: slime_name,
//         slime_type: slime_type,
//         slime_move1: select1.value,
//         slime_move2: select2.value,
//         slime_move3: select3.value,
//         slime_health: slime_health,
//         weakness: weakness,
//         image: image
//     })
//         .then(function (response) {
//             console.log(response.data);
//         })
//         .catch(function (error) {
//             console.error(error);
//         });
// });
