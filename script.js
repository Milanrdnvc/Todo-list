const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.todo-add');
const clearAllBtn = document.querySelector('.clear-all');
let itemDeleteButton;
let itemCompleteButton;

loadItemsFromLocalStorage();
clearAllBtn.addEventListener('click', deleteAllItems);
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
        let todoArray = JSON.parse(localStorage.getItem('todoList'));
        todoArray.push({content: li.innerHTML, id: ID, done: false});
        localStorage.setItem('todoList', JSON.stringify(todoArray));
    }

    itemDeleteButton = document.querySelectorAll('.item-delete');
    itemCompleteButton = document.querySelectorAll('.item-complete');
    deleteItem(itemDeleteButton);
    completeItem(itemCompleteButton);
}

function addItemFromInput(e) {
    if ((e.key === 'Enter' || e.target.classList[1] === 'todo-add') && input.value !== '') {
        appendToDOMAndLS(input.value);
        input.value = '';
    } 
}

function loadItemsFromLocalStorage() {
    if (localStorage.getItem('todoList')) {
        if (ul.querySelector('li')) {
            ul.querySelectorAll('li').forEach(li => li.remove());
        }
        
        for (let i = 0; i < JSON.parse(localStorage.getItem('todoList')).length; i++) {
            let li = document.createElement('li');
            li.innerHTML = JSON.parse(localStorage.getItem('todoList'))[i].content;
            li.id = JSON.parse(localStorage.getItem('todoList'))[i].id;
            if (JSON.parse(localStorage.getItem('todoList'))[i].done) {
                li.style.color = 'green';
            }

            ul.appendChild(li);
        }

        itemDeleteButton = document.querySelectorAll('.item-delete');
        itemCompleteButton = document.querySelectorAll('.item-complete');
        deleteItem(itemDeleteButton);
        completeItem(itemCompleteButton);
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

function completeItem(cmpBtn) {
    cmpBtn.forEach(btn => {
        if (!btn.onclick) {
            btn.onclick = function() {
                let todoArray = JSON.parse(localStorage.getItem('todoList'));
                let index = todoArray.findIndex(i => String(i.id) === String(btn.parentNode.parentNode.id));
                todoArray[index].done = true;
                localStorage.setItem('todoList', JSON.stringify(todoArray));
                btn.parentNode.parentNode.style.color = 'green';
            }
        }
    });
}

function deleteAllItems() {
    itemDeleteButton.forEach(btn => {
        btn.parentNode.parentNode.remove();
    });

    localStorage.removeItem('todoList');
}