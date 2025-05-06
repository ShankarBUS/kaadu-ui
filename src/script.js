import { enableStickyHeader, enableHamburgerMenu, createExpander, setupMessagePopup, showMessagePopup, createKeyValueTable } from './kaadu-ui.js';
import { ComboBox } from './combo-box.js';

enableStickyHeader();
enableHamburgerMenu();
setupMessagePopup();

const exp1 = createExpander(
    [document.createTextNode('Header')],
    createKeyValueTable({ 'label': 'value', 'number': 3, 'boolean': true, 'array': [1, 2, 3] }),
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

const combobox = document.getElementById('cmbBox');
combobox.loadOptions([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
]);

combobox.addEventListener('selectionChanged', (event) => {
    console.log('Selected item:', event.detail);
});