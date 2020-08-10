const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.todo-add');
let itemDeleteButton;

loadItemsFromLocalStorage();
input.addEventListener('keydown', addItemFromInput);
addTodoBtn.addEventListener('click', addItemFromInput);

function appendToDOMAndLS(inputValue) {
    let li = document.createElement('li');
    li.innerHTML = `${inputValue}
                    <div class="delete-complete-wrapper">
                        <span class="item-complete">&#10003;</span>
                        <span class="item-delete">&times;</span>
                    </div>`;
    ul.appendChild(li);
    if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([li.innerHTML]));
    } else {
        let oldList = JSON.parse(localStorage.getItem('todoList'));
        oldList.push(li.innerHTML);
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
        // ul.querySelectorAll('li').forEach(item => item.remove());
        for (let i = 0; i < JSON.parse(localStorage.getItem('todoList')).length; i++) {
            let li = document.createElement('li');
            li.innerHTML = JSON.parse(localStorage.getItem('todoList'))[i];
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
                btn.parentNode.parentNode.remove();
                // REMOVE FROM LOCAL STORAGE
            }
        }
    });
}

// function updateItemDelete() {
//     itemDelete = document.querySelectorAll('.item-delete');
//     itemDelete.forEach((item, index) => {
//         // item.addEventListener('click', () => {
//         //     item.parentNode.parentNode.remove();
//         //     let todoLists = JSON.parse(localStorage.getItem('todoList'));
//         //     // todoLists.splice(index, 1);
//         //     console.log(todoLists);
//         // });
//         if (!item.onclick) {
//             item.onclick = function() {
//                 item.parentNode.parentNode.remove();
//                 let todoLists = JSON.parse(localStorage.getItem('todoList'));
//                 localStorage.removeItem('todoList')
//             };
//         }
//     });
// }
