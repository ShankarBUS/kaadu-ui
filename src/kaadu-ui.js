export function enableStickyHeader(offset = 50) {
    const header = document.getElementById("header");
    document.documentElement.style.scrollPaddingTop = `${offset + 60}px`;
    window.addEventListener("scroll", () => {
        document.body.classList.remove('nav-open');
        const currentScroll = window.pageYOffset;
        if (currentScroll > offset) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
}

export function enableHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const smokeBackground = document.getElementById('smokeBackground');

    hamburgerMenu.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    smokeBackground.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
}

export function setupMessagePopup() {
    const messagePopup = document.createElement('div');
    messagePopup.id = 'messagePopup';
    messagePopup.className = 'popup';
    messagePopup.setAttribute('aria-hidden', 'true');

    const popupContent = document.createElement('div');
    popupContent.id = 'popupContent';
    popupContent.className = 'popup-content';

    const closePopup = document.createElement('button');
    closePopup.id = 'closePopup';
    closePopup.setAttribute('aria-label', 'Close Popup');
    closePopup.textContent = 'OK';

    const popupText = document.createElement('p');
    popupText.id = 'popupText';

    popupContent.appendChild(closePopup);
    popupContent.appendChild(popupText);
    messagePopup.appendChild(popupContent);
    document.body.appendChild(messagePopup);

    closePopup.addEventListener('click', () => hideMessagePopup());

    messagePopup.addEventListener('click', (event) => {
        if (event.target === messagePopup) hideMessagePopup();
    });
}

export function showMessagePopup(message) {
    const messageText = document.getElementById('popupText');
    messageText.textContent = message;
    const messagePopup = document.getElementById('messagePopup');
    messagePopup.setAttribute('aria-hidden', 'false');
}

export function hideMessagePopup() {
    const messagePopup = document.getElementById('messagePopup');
    messagePopup.setAttribute('aria-hidden', 'true');
}