window.addEventListener('DOMContentLoaded', () => {
    const $btns = document.querySelectorAll('.tasks-info__btn');
    const $parentBtns = document.querySelector('.tasks-info__filter');

    $parentBtns.addEventListener('click', (e) => {
        const btnTarget = e.target;
        $btns.forEach(btn => {
            btn.classList.remove('tasks-info__btn_active');
        })
        btnTarget.classList.add('tasks-info__btn_active');
    })
})