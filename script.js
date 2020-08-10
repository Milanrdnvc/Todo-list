let itemCount = 0;
let itemDelete;
loadItemsFromLocalStorage();

const input = document.querySelector('input');
const ul = document.querySelector('ul');
const todoAdd = document.querySelector('.todo-add');


for (let item in localStorage) {
    if (/item/.test(item)) {
        itemCount++;
    }
}

input.addEventListener('keydown', addItem);
todoAdd.addEventListener('click', addItem);

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
        localStorage.setItem(`item${itemCount}`, li.innerHTML);
        itemCount++;
    } else return;
}

function loadItemsFromLocalStorage() {
    for (let i = 0; i < itemCount; i++) {
        let li = document.createElement('li');
        li.innerHTML = localStorage.getItem(`item${i}`);
        ul.appendChild(li);
    }

    itemDelete = document.querySelectorAll('.item-delete');
    itemDelete.forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.parentElement.remove();

        });
    });   
}


