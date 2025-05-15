// Kaadu UI JavaScript Module

let scrollListening = false;
let header = null;
let headerOffset = 0;
let footer = null;

function handleScroll() {
    document.body.classList.remove('nav-open');
    const currentScroll = window.pageYOffset;
    if (currentScroll > headerOffset) {
        header.classList.add("sticky-header");
    } else {
        header.classList.remove("sticky-header");
    }

    if (currentScroll >  document.body.scrollHeight - window.innerHeight - footer.offsetHeight) {
        footer.classList.remove("floating-footer");
    } else {
        footer.classList.add("floating-footer");
    }
}

/**
 * Enables a sticky header that becomes fixed after scrolling past a certain offset.
 * @param {number} [offset=50] - The scroll offset after which the header becomes sticky.
 */
export function enableStickyHeader(offset = 50) {
    header = document.getElementById("pageHeader");
    document.documentElement.style.scrollPaddingTop = `${offset + 60}px`;
    headerOffset = offset;
    if (!scrollListening) {
        window.addEventListener("scroll", handleScroll);
        scrollListening = true;
    }
}

/**
 * Enables a floating footer that becomes fixed at the bottom of the viewport when scrolling.
 */
export function enableFloatingFooter() {
    footer = document.getElementById("pageFooter");
    const footerHeight = footer.offsetHeight;
    const mainContent = document.getElementById("main");
    mainContent.style.paddingBottom = `${footerHeight}px`;

    let footerOffset = document.body.scrollHeight - window.innerHeight - footerHeight
    if (window.pageYOffset < footerOffset) footer.classList.add("floating-footer"); 
    if (!scrollListening) {
        window.addEventListener("scroll", handleScroll);
        scrollListening = true;
    }
}

/**
 * Enables a hamburger menu that toggles the visibility of the navigation menu.
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
 * @param {string} buttonClass - Additional CSS class to style the button.
 * @returns {HTMLElement} - The created expander element containing the button and panel.
 */
export function createExpander(buttonContents, panelContent, buttonClass = '') {
    const content = document.createElement('div');
    content.className = 'expander-item-content';
    content.appendChild(panelContent);

    const button = document.createElement('button');
    button.className = `expander-button ${buttonClass}`;
    buttonContents.forEach(e => {
        button.appendChild(e);
    });
    button.addEventListener('click', () => {
        item.classList.toggle('expander-open');
    });

    const item = document.createElement('div');
    item.className = 'expander-item';
    item.appendChild(button);
    item.appendChild(content);
    return item;
}

/**
 * Adds a key-value row to a table.
 * @param {HTMLTableElement} table - The table to which the row will be appended.
 * @param {string} label - The label for the key (displayed in the first cell).
 * @param {HTMLElement} value - The value as an HTML element (displayed in the second cell).
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
 * @param {Object} obj - The object containing key-value pairs.
 * @param {Function} [valuefun=null] - A function to transform each value into an HTML element.
 * @returns {HTMLTableElement} - The created table element populated with key-value rows.
 */
export function createKeyValueTable(obj, valuefun = null) {
    const infoTable = document.createElement('table');
    infoTable.className = 'info-table';

    for (const [key, val] of Object.entries(obj)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter of the key

        let value;
        if (valuefun) {
            value = valuefun(val)
        } else {
            value = document.createElement('span');
            value.textContent = val;
        }

        addKeyValueRowToTable(infoTable, label, value);
    }

    return infoTable;
}

/**
 * Sets up a message popup element in the DOM. The popup includes a close button and a text area for displaying messages.
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

    popupContent.appendChild(popupText);
    popupContent.appendChild(closePopup);
    messagePopup.appendChild(popupContent);
    document.body.appendChild(messagePopup);

    closePopup.addEventListener('click', () => hideMessagePopup());

    messagePopup.addEventListener('click', (event) => {
        if (event.target === messagePopup) hideMessagePopup();
    });
}

/**
 * Displays a message in the popup.
 * @param {string} message - The message to display inside the popup.
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