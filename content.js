const HOME_PAGES = {
    chrome: "https://google.com",
    yandex: "https://yandex.ru",
    edge: "https://bing.com"
};

function isFullscreen() {
    return window.innerHeight === screen.height;
}

function createPanel() {

    if (document.getElementById("kiosk-panel")) return;
    if (!isFullscreen()) return;

    const panel = document.createElement("div");
    panel.id = "kiosk-panel";
    document.body.appendChild(panel);

    // Кнопка - Назад
    const button_back = document.createElement("button");
    button_back.textContent = "◀";
    button_back.onclick = () => history.back();
    panel.appendChild(button_back);

    // Кнопка - Домой
    const button_home = document.createElement("button");
    button_home.textContent = "🏠︎";
    
    button_home.onclick = ()  => {
        chrome.storage.sync.get(["home"], (data) => {
            if (data.home) {
                window.location.href = data.home;
            } else {
                window.location.href = "https://google.com";
            }
        });
    };

    panel.appendChild(button_home);

    //Кнопка - Вперед
    const button_next = document.createElement("button");
    button_next.textContent = "▶";
    button_next.onclick = () => history.forward();
    panel.appendChild(button_next);

    //Кнопка - Перезагрузка
    const reload = document.createElement("button");
    reload.textContent = "❇";
    reload.onclick = () => location.reload();
    panel.appendChild(reload);

    const targetDiv = document.querySelector('#kiosk-panel');

    if (!targetDiv) return;

    // Показывать панель при наведении на targetDiv
    targetDiv.addEventListener('mouseenter', () => {
        panel.style.transition = 'opacity 0.3s';
        panel.style.opacity = '1';
    });

    // Скрывать панель, если мышь ушла с панели
    panel.addEventListener('mouseleave', () => {
        panel.style.transition = 'opacity 0.3s';
        panel.style.opacity = '0';
    });
}

function removePanel() {
    const panel = document.getElementById("kiosk-panel");
    if (panel) panel.remove();
}

//Проверка на fullscreen
setInterval(() => {
    if (isFullscreen()) {
        createPanel();
    } else {
        removePanel();
    }
}, 500);
