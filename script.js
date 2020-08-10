const input = document.querySelector('input');
const ul = document.querySelector('ul');

input.addEventListener('keydown', addItem);
loadItemsFromLocalStorage();

function addItem(e) {
    if ((e.key === 'Enter' || e.target.classList[1] === 'todo-add') && input.value !== '') {
        let li = document.createElement('li');
        li.innerHTML = `${input.value}
                        <div class="delete-complete-wrapper">
                            <span class="item-complete">&#10003;</span>
                            <span class="item-delete">&times;</span>
                        </div>`;
        ul.appendChild(li);
        input.value = '';
        if (!localStorage.getItem('todoItem')) {
            localStorage.setItem('todoItem', JSON.stringify([li.innerHTML]));
        } else {
            let oldItems = JSON.parse(localStorage.getItem('todoItem'));
            oldItems.push(li.innerHTML);
            localStorage.setItem('todoItem', JSON.stringify(oldItems));
        }
    } else return;
}

function loadItemsFromLocalStorage() {
    for (let i = 0; i < JSON.parse(localStorage.getItem('todoItem')).length; i++) {
        let li = document.createElement('li');
        li.innerHTML = JSON.parse(localStorage.getItem('todoItem'))[i];
        ul.appendChild(li);
    } 
}

