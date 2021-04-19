window.addEventListener('DOMContentLoaded', () => {
    const $btnTheme = document.querySelector('.btn_theme');
    const $blockMain = document.querySelector('.main');

    if (localStorage.getItem('theme')) {
        initialState(localStorage.getItem('theme'));
    } else {
        initialState('light-theme');
    }

    function initialState(themeName) {
        localStorage.setItem('theme', themeName);
        $blockMain.classList.add(themeName);
    }

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
        
    });
});