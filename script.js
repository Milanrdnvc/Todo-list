const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.todo-add');
let itemDelete;

loadItemsFromLocalStorage();
addDeleteEvent();
input.addEventListener('keydown', addItem);
addTodoBtn.addEventListener('click', addItem);

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
            addDeleteEvent();
        } else {
            let oldItems = JSON.parse(localStorage.getItem('todoItem'));
            oldItems.push(li.innerHTML);
            localStorage.setItem('todoItem', JSON.stringify(oldItems));
            itemDelete = document.querySelectorAll('.item-delete');
            addDeleteEvent();
        }
    } else return;
}

function loadItemsFromLocalStorage() {
    for (let i = 0; i < JSON.parse(localStorage.getItem('todoItem')).length; i++) {
        let li = document.createElement('li');
        li.innerHTML = JSON.parse(localStorage.getItem('todoItem'))[i];
        ul.appendChild(li);
    }

    itemDelete = document.querySelectorAll('.item-delete');
}

function addDeleteEvent() {
    itemDelete.forEach((item, index) => {
        item.onclick = function() {
            item.parentNode.parentNode.remove();
            let todoItems = JSON.parse(localStorage.getItem('todoItem'));
            todoItems.splice(index, 1);
            localStorage.setItem('todoItem', JSON.stringify(todoItems));
        }
    });
}

