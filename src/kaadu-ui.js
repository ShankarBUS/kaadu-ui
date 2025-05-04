/**
 * Enables a sticky header that becomes fixed after scrolling past a certain offset.
 * @param {number} [offset=50] - The scroll offset after which the header becomes sticky.
 */
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

/**
 * Enables a hamburger menu that toggles navigation visibility.
 */
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

/**
 * Creates an expandable UI component with a button and a collapsible panel.
 * @param {HTMLElement[]} buttonContents - Array of elements to be added to the button.
 * @param {HTMLElement} panelContent - The content to display in the collapsible panel.
 * @param {string} buttonClass - Additional CSS class for the button.
 * @returns {HTMLElement} - The created expander element.
 */
export function createExpander(buttonContents, panelContent, buttonClass) {
    const content = document.createElement('div');
    content.className = 'expander-item-content';
    content.appendChild(panelContent);

    const button = document.createElement('button');
    button.className = `expander-button ${buttonClass}`;
    buttonContents.forEach(e => {
        button.appendChild(e);
    });
    button.addEventListener('click', () => {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });

    const item = document.createElement('div');
    item.className = 'expander-item';
    item.appendChild(button);
    item.appendChild(content);
    return item;
}

/**
 * Adds a key-value row to a table.
 * @param {HTMLTableElement} table - The table to which the row will be added.
 * @param {string} label - The label for the key.
 * @param {HTMLElement} value - The value as an HTML element.
 */
export function addKeyValueRowToTable(table, label, value) {
    const row = document.createElement('tr');

    const labelCell = document.createElement('td');
    labelCell.textContent = label;
    labelCell.className = 'label-cell';

    const valueCell = document.createElement('td');
    valueCell.appendChild(value);
    valueCell.className = 'value-cell';

    row.appendChild(labelCell);
    row.appendChild(valueCell);
    table.appendChild(row);
};

/**
 * Creates a table with key-value pairs from a JSON object.
 * @param {Object} json - The JSON object containing key-value pairs.
 * @param {Function} valuefun - A function to transform the value into an HTML element.
 * @returns {HTMLTableElement} - The created table element.
 */
export function createKeyValueTable(json, valuefun) {
    const infoTable = document.createElement('table');
    infoTable.className = 'info-table';

    for (const [key, val] of Object.entries(json)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter of the key
        const value = valuefun(val);
        addKeyValueRowToTable(infoTable, label, value);
    }

    return infoTable;
}

/**
 * Sets up a message popup element in the DOM.
 */
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

/**
 * Displays a message in the popup.
 * @param {string} message - The message to display in the popup.
 */
export function showMessagePopup(message) {
    const messageText = document.getElementById('popupText');
    messageText.textContent = message;
    const messagePopup = document.getElementById('messagePopup');
    messagePopup.setAttribute('aria-hidden', 'false');
}

/**
 * Hides the message popup.
 */
export function hideMessagePopup() {
    const messagePopup = document.getElementById('messagePopup');
    messagePopup.setAttribute('aria-hidden', 'true');
}