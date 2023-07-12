function addToTable(slime_id, slime_name, slime_type, slime_move1, slime_move2, slime_move3, slime_health, weakness) {
    const template = document.querySelector('#row-template');
    const row = template.content.firstElementChild.cloneNode(true);

    row.querySelector('.slime_id').textContent = slime_id;
    row.querySelector('.slime_name').textContent = slime_name;
    row.querySelector('.slime_type').textContent = slime_type;
    row.querySelector('.slime_move1').textContent = slime_move1;
    row.querySelector('.slime_move2').textContent = slime_move2;
    row.querySelector('.slime_move3').textContent = slime_move3;
    row.querySelector('.slime_health').textContent = slime_health;
    row.querySelector('.weakness').textContent = weakness;
    
    const removeCell = row.querySelector('.remove');

    if (removeCell) {
        const removeButton = removeCell.querySelector('button');
        removeButton.onclick = function () {
            if (confirm("Delete Confirmation?") == true) {
                row.parentNode.removeChild(row);
                axios.delete('http://localhost:3000/api/allSlime', { data: { slime_id } })
            }

        };
    }

    
    document.querySelector('#module-tbody').appendChild(row);
}