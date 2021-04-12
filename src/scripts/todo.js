window.addEventListener('DOMContentLoaded', () => {
    const $formAddTodo = document.querySelector('#form-add'),
        $inputAddTask = document.querySelector('.new-todo__input'),
        $labelAddTask = document.querySelector('.new-todo__label'),
        $todo = document.querySelector('.tasks'),
        $countTaskActive = document.querySelector('.count');

    const $parentBtns = document.querySelector('.tasks-info__filter'),
        $btns = document.querySelectorAll('.tasks-info__btn'),
        $btnClearCompletedTasks = document.querySelector('[data-btn="clear-completed-tasks"]'),
        $btnAllTasks = $parentBtns.querySelector('[data-btn="all-tasks"]');
        $btnActiveTasks = $parentBtns.querySelector('[data-btn="active-tasks"]');

    let tasks = [];
    let arrTasksActive = [];
    let arrTasksCompleted = [];

    if (localStorage.getItem('todo')) {
        tasks = JSON.parse(localStorage.getItem('todo'));
        displayTasks(tasks);
    }

    $inputAddTask.addEventListener('focus', () => {
        $labelAddTask.style.display = 'block';
    })
    $inputAddTask.addEventListener('blur', () => {
        $labelAddTask.style.display = 'none';
    })

    $parentBtns.addEventListener('click', (e) => {
        const btnTarget = e.target.dataset.btn;
        
        switch(btnTarget) {
            case 'active-tasks':
                arrTasksActive = tasks.filter(item => item.checked === false);
                displayTasks(arrTasksActive);
                break;
            case 'all-tasks':
                displayTasks(tasks);
                break;
            case 'completed-tasks':
                arrTasksCompleted = tasks.filter(item => item.checked === true);
                displayTasks(arrTasksCompleted);
                break;
        }
    })

    $btnClearCompletedTasks.addEventListener('click', () => {
        tasks = JSON.parse(localStorage.getItem('todo')).filter(item => item.checked === false);
        localStorage.setItem('todo', JSON.stringify(tasks));
        displayTasks(tasks);
    })

    $formAddTodo.addEventListener('submit', (e) => {
        e.preventDefault();
        if ($inputAddTask.value.trim() != 0) {
            let newTask = {
                task: $inputAddTask.value,
                checked: false
            }
            tasks.push(newTask);
            displayTasks(tasks);
            localStorage.setItem('todo', JSON.stringify(tasks));

            $btns.forEach(btn => {
                btn.classList.remove('tasks-info__btn_active');
            })
            $btnAllTasks.classList.add('tasks-info__btn_active');
            
            $formAddTodo.reset();
        }
        
    });

    function displayTasks(tasks) {
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
                arrTasksActive = tasks.filter(item => item.checked === false);
            })
            $countTaskActive.textContent = arrTasksActive.length;
        }
        
    }

    $todo.addEventListener('click', (e) => {
        if (e.target.dataset.index) {
            let index = +e.target.dataset.index;
            tasks = JSON.parse(localStorage.getItem('todo'));
            tasks.splice(index, 1);
            localStorage.setItem('todo', JSON.stringify(tasks));
            displayTasks(tasks);
            
        }
        if (e.target.getAttribute('id')) {
            let idInput = e.target.getAttribute('id');
            let idLabel = document.querySelector('[for=' + idInput + ']');
            const valueLabel = idLabel.textContent.trim();
            
            tasks.forEach(item => {
                if (item.task === valueLabel) {
                    item.checked = !item.checked;
                    localStorage.setItem('todo', JSON.stringify(tasks));

                    arrTasksActive = tasks.filter(item => item.checked === false);
                }
                
            })
            $countTaskActive.textContent = arrTasksActive.length;
        }

        /* if ($btnActiveTasks.classList.contains('tasks-info__btn_active')) {
            tasks = JSON.parse(localStorage.getItem('todo')).filter(item => item.checked === false);

            console.log(tasks);
        } */
       
    })


});