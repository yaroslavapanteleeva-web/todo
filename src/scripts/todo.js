window.addEventListener('DOMContentLoaded', () => {
    const $formAddTodo = document.querySelector('#form-add'),
        $inputAddTask = document.querySelector('.new-todo__input'),
        $labelAddTask = document.querySelector('.new-todo__label'),
        $todo = document.querySelector('.tasks'),
        $countTaskActive = document.querySelector('.count');

    let tasks = [];

    if (localStorage.getItem('todo')) {
        tasks = JSON.parse(localStorage.getItem('todo'));
        displayTasks();
    }

    /* let tasksActive = JSON.parse(localStorage.getItem('todo'));
    tasksActive.forEach(task => {
        console.log(task.checked);
    }) */

    $inputAddTask.addEventListener('focus', () => {
        $labelAddTask.style.display = 'block';
    })
    $inputAddTask.addEventListener('blur', () => {
        $labelAddTask.style.display = 'none';
    })

    $formAddTodo.addEventListener('submit', (e) => {
        e.preventDefault();
        if ($inputAddTask.value.trim() != 0) {
            let newTask = {
                task: $inputAddTask.value,
                checked: false
            }
            tasks.push(newTask);
            displayTasks();
            localStorage.setItem('todo', JSON.stringify(tasks));
            $formAddTodo.reset();
        }
        
    });

    function displayTasks() {
        let displayTask = '';

        if (tasks.length === 0) {
            $todo.innerHTML = '';
        } else {
            tasks.forEach((item, index) => {
                displayTask += `
                    <div class="task">
                        <input type="checkbox" id="task-${index}" class="task__checkbox checkbox" ${item.checked ? 'checked' : ''}>
                        <label class="task__label checkbox__label" for="task-${index}">
                            <span class="checkbox__custom"></span>
                            ${item.task}
                        </label>
                        <button class="task__btn_delete" data-index="${index}">
                            <img src="assets/img/delete.svg" alt="btn-delete" data-index="${index}">
                        </button>
                    </div>
                `;
                $todo.innerHTML = displayTask;
    
            })
        }
    }

    $todo.addEventListener('click', (e) => {
        if (e.target.dataset.index) {
            let index = +e.target.dataset.index;
            console.log(index);
            tasks = JSON.parse(localStorage.getItem('todo'));
            tasks.splice(index, 1);
            localStorage.setItem('todo', JSON.stringify(tasks));
            displayTasks();
            
        }
        if (e.target.getAttribute('id')) {
            let idInput = e.target.getAttribute('id');
            let idLabel = document.querySelector('[for=' + idInput + ']');
            const valueLabel = idLabel.textContent.trim();
            
            tasks.forEach(item => {
                if (item.task === valueLabel) {
                    item.checked = !item.checked;
                    localStorage.setItem('todo', JSON.stringify(tasks));
                }
            })
        }
    })


});