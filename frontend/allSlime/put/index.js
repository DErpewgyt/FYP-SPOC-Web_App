function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}
//var window = this.window;

API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');
const txtHost = document.getElementById("hostname");
console.log("window.location.hostname", location.hostname);

window.addEventListener('DOMContentLoaded', function () {

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
                    response.data[i].weakness,
                    response.data[i].image)
            }
        })

    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const id = form.querySelector('input[name=id]').value;
        const slime_name = form.querySelector('input[name=slime_name]').value;
        const slime_type = form.querySelector('select[name=slime_type]').value;
        const move_name1 = form.querySelector('select[name=move_name1]').value;
        const move_name2 = form.querySelector('select[name=move_name2]').value;
        const move_name3 = form.querySelector('select[name=move_name3]').value;
        const slime_health = form.querySelector('input[name=slime_health]').value;
        const weakness = form.querySelector('select[name=weakness]').value;
        const image = form.querySelector('input[name=image]').value

        const allInput = form.querySelectorAll('input, button[type=submit]');

        allInput.forEach((input) => {
            input.disabled = true;
        });

        console.log("start axios update");
        axios.put(API_URL+'/api/allSlime/:slimeid',
            {
                slime_id: id,
                slime_name: slime_name,
                slime_type: slime_type,
                slime_move1: move_name1,
                slime_move2: move_name2,
                slime_move3: move_name3,
                slime_health: slime_health,
                weakness: weakness,
                image: image,
            })
            .then(function (response) {
                // If not successful (i.e. there's error)
                if (response.status == 201) return response.data; // parse body as JSON string

                // Clear inputs
                allInput.forEach((input) => {
                    if (input.type !== 'submit') input.values = '';
                });

                alert(`Slime "${slime_id}" has been renamed!`);
                return; // Success response has no body, hence next .then() will be null
            })  
            .then(function (body) {
                if (!body) return; // If successfully created, body will be empty
                alert(body.error); // else there's an error
                return;
            })
            .then(function () {
                // Enable inputs
                allInput.forEach((input) => {
                    input.disabled = false;
                })
            })
            .finally(() => {
                location.reload()
            });
    };
});