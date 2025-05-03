import { enableStickyHeader, enableHamburgerMenu, setupMessagePopup, showMessagePopup } from './kaadu-ui.js';

enableStickyHeader();
enableHamburgerMenu();
setupMessagePopup();

document.getElementById('showPopupButton').addEventListener('click', () => {
    showMessagePopup('Hello, this is a message popup!');
});