function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}
//var window = this.window;

API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');
const txtHost = document.getElementById("hostname");
console.log("window.location.hostname", location.hostname);


var slimes = document.getElementById("slimeList")

$(document).ready(function () {
    axios.get(API_URL+"/api/allSlime")
        .then(
            function (response) {
                console.log("response", response.data);
                if (response.data.length == 0) {
                    console.log("No Slimes");
                    $("#slimeList").html("No Slimes")
                    return
                }

                response.data.forEach(slime => {
                    var card = document.createElement("div");
                    card.classList.add("card");
                    // store details of the card in the attribute
                    card.setAttribute("data-slime_id", slime.slime_id);

                    var image = document.createElement("img");
                    image.src = slime.image;
                    image.alt = slime.slime_name;
                    
                    switch (slime.slime_type) {
                        case "water":
                        case "Water":
                            var img = document.createElement('img');
                            img.src = "waterslime1.png"
                            img.style.width = '130px'
                            img.style.height = '130px'
                            img.className = "waterslime"
                            card.id = "water"
                            console.log("water Slime")
                            card.appendChild(img);
                            break;
                        case "fire":
                        case "Fire":
                            var img = document.createElement('img');
                            img.src = "fireslime1.png"
                            img.style.width = '130px'
                            img.style.height = '130px'
                            img.className = "fireslime"
                            console.log("Fire Slime")
                            card.id = "fire"
                            card.appendChild(img);
                            break;
                        case "Earth":
                        case "earth":
                            var img = document.createElement('img');
                            img.src = "groundslime1.png"
                            img.style.width = '130px'
                            img.style.height = '130px'
                            img.className = "earthslime"
                            console.log("earth Slime")
                            card.id = "earth"
                            card.appendChild(img);
                            break;
                    }
                    var name = document.createElement("h3");
                    name.textContent = slime.slime_name;
                    card.appendChild(name);

                    var type = document.createElement("p");
                    type.textContent = "Type: " + slime.slime_type;
                    card.appendChild(type);

                    var move1 = document.createElement("p");
                    move1.textContent = "Move #1: " + slime.slime_move1;
                    card.appendChild(move1);

                    var move2 = document.createElement("p");
                    move2.textContent = "Move #2: " + slime.slime_move2;
                    card.appendChild(move2);

                    var move3 = document.createElement("p");
                    move3.textContent = "Move #3: " + slime.slime_move3;
                    card.appendChild(move3);

                    var health = document.createElement("p");
                    health.textContent = "Health: " + slime.slime_health;
                    card.appendChild(health);

                    var weakness = document.createElement("p");
                    weakness.textContent = "Weakness: " + slime.weakness;
                    card.appendChild(weakness);

                    slimes.appendChild(card);
                });
            },
            function (error) {
                // display error message
                $("#slimeList").html("Error")
            }
        )
        .catch(function (error) {
            console.log(error);
            $("#slimeList").html("Error")
        })
})