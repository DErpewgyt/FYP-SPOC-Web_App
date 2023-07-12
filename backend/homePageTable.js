function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
  }
  //var window = this.window;
  
  API_URL = (isLocalhost(location.hostname) != true ? 'https://' + location.hostname : 'http://localhost:3000');

function addToTable(AdminNo,StudentName,AttemptKera,AttemptPhoro) {
    const template = document.querySelector('#row-template');
    // var templateid = document.getElementById('row-template');
    // var tablerow = templateid.getElementsByTagName('tr')
    
    // var img = document.getElementById('image')
    // const img = document.getElementById("image")
    // row = document.getElementById('row-template')
    
    const row = template.content.firstElementChild.cloneNode(true);
    row.querySelector('.AdminNo').textContent = AdminNo;
    row.querySelector('.StudentName').textContent = StudentName;
    row.querySelector('.AttemptKera').textContent = AttemptKera;
    row.querySelector('.AttemptPhoro').textContent = AttemptPhoro;
   
    // img.innerHTML = `<img src="fireslime1.png">`;
    const removeCell = row.querySelector('.remove');
    if (removeCell) {
        const removeButton = removeCell.querySelector('button');
        removeButton.onclick = function () {
            if(confirm("Are you sure you want to set your slime free?") == true){

            
            row.parentNode.removeChild(row);
            axios.delete(API_URL +'/api/slimeinventory',{data:{slime_name}})
            }
            
        };
    }

    document.querySelector('#module-tbody').appendChild(row);
}
