import { enableStickyHeader, enableHamburgerMenu, createExpander, setupMessagePopup, showMessagePopup } from './kaadu-ui.js';

enableStickyHeader();
enableHamburgerMenu();
setupMessagePopup();

const exp1 = createExpander(
    [document.createTextNode('Header')],
    document.createTextNode('Content'),
    'expander-fail'
);
const exp2 = createExpander(
    [document.createTextNode('Header')],
    document.createTextNode('Content'),
    'expander-fail'
);

const expandersContainer = document.getElementById('expandersContainer');
expandersContainer.appendChild(exp1);
expandersContainer.appendChild(exp2);

document.getElementById('showPopupButton').addEventListener('click', () => {
    showMessagePopup('Hello, this is a message popup!');
});