const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.todo-add');
let itemDeleteButton;

loadItemsFromLocalStorage();
input.addEventListener('keydown', addItemFromInput);
addTodoBtn.addEventListener('click', addItemFromInput);

function appendToDOMAndLS(inputValue) {
    let ID = Date.now();
    let li = document.createElement('li');
    li.innerHTML = `${inputValue}
                    <div class="delete-complete-wrapper">
                        <span class="item-complete">&#10003;</span>
                        <span class="item-delete">&times;</span>
                    </div>`;
    li.id = ID;
    ul.appendChild(li);
    if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([{content: li.innerHTML, id: ID, done: false}]));
    } else {
        let oldList = JSON.parse(localStorage.getItem('todoList'));
        oldList.push({content: li.innerHTML, id: ID, done: false});
        localStorage.setItem('todoList', JSON.stringify(oldList));
    }

    itemDeleteButton = document.querySelectorAll('.item-delete');
    deleteItem(itemDeleteButton);
}

function addItemFromInput(e) {
    if ((e.key === 'Enter' || e.target.classList[1] === 'todo-add') && input.value !== '') {
        appendToDOMAndLS(input.value);
        input.value = '';
    } else return;
}

function loadItemsFromLocalStorage() {
    if (localStorage.getItem('todoList')) {
        for (let i = 0; i < JSON.parse(localStorage.getItem('todoList')).length; i++) {
            let li = document.createElement('li');
            li.innerHTML = JSON.parse(localStorage.getItem('todoList'))[i].content;
            li.id = JSON.parse(localStorage.getItem('todoList'))[i].id;
            ul.appendChild(li);
        }

        itemDeleteButton = document.querySelectorAll('.item-delete');
        deleteItem(itemDeleteButton);
    }
}

function deleteItem(delBtn) {
    delBtn.forEach(btn => {
        if (!btn.onclick) {
            btn.onclick = function() {
                let todoArray = JSON.parse(localStorage.getItem('todoList'));
                let index = todoArray.findIndex(i => String(i.id) === String(btn.parentNode.parentNode.id));
                todoArray.splice(index, 1);
                localStorage.setItem('todoList', JSON.stringify(todoArray));
                btn.parentNode.parentNode.remove();
            }
        }
    });
}
