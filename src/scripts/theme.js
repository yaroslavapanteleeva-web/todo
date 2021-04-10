window.addEventListener('DOMContentLoaded', () => {
    const $btnTheme = document.querySelector('.btn_theme');
    const $blockMain = document.querySelector('.main');

    function initialState(themeName) {
        localStorage.setItem('theme', themeName);
        $blockMain.classList.add(themeName);
    }

    initialState('light-theme');

    /* localStorage.theme = 'dark-theme' ? initialState('dark-theme') : initialState('light-theme'); */

    function toggleTheme() {
        switch(localStorage.getItem('theme')) {
            case 'dark-theme':
                initialState('light-theme');
                $blockMain.classList.remove('dark-theme');
                break;
            case 'light-theme':
                initialState('dark-theme');
                $blockMain.classList.remove('light-theme');
                break;
        }
    }
    
    $btnTheme.addEventListener('click', () => {
        toggleTheme();
        console.log(localStorage.theme);
    });
    

    
});