window.addEventListener('DOMContentLoaded', () => {
    const $draggables = document.querySelectorAll('.task');
    const $container = document.querySelector('.tasks');

    $draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    })

    $container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const $draggable = document.querySelector('.dragging');
        const afterElement = getDragAfterElement($container, e.clientY);

        if (afterElement == null) {
            $container.appendChild($draggable);
        } else {
            $container.insertBefore($draggable, afterElement);
        }
    })

    function getDragAfterElement(container, y) {
        const draggableElement = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElement.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element

    }

});
