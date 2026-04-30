// Kaadu UI JavaScript Module

let scrollListening = false;
let header = null;
let headerOffset = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;

  if (header)
    header.classList.toggle("sticky", currentScroll > headerOffset);
}

/**
 * Enables a sticky header that becomes fixed after scrolling past a certain offset.
 * @param {number} [offset=50] - The scroll offset after which the header becomes sticky.
 */
export function enableStickyHeader(offset = 50) {
  header = document.getElementById("header");
  document.documentElement.style.scrollPaddingTop = `${offset + 60}px`;
  headerOffset = offset;
  if (!scrollListening) {
    window.addEventListener("scroll", handleScroll);
    scrollListening = true;
  }
}

/**
 * Creates an expandable UI component with a button and a collapsible panel.
 * @param {HTMLElement[]} buttonContents - Array of elements to be added to the button.
 * @param {HTMLElement} panelContent - The content to display in the collapsible panel.
 * @param {string} buttonClass - Additional CSS class to style the button.
 * @returns {HTMLElement} - The created expander element containing the button and panel.
 */
export function createExpander(buttonContents, panelContent, buttonClass = "") {
  const content = document.createElement("div");
  content.className = "expander-content";
  content.appendChild(panelContent);

  const button = document.createElement("button");
  button.className = `expander-button ${buttonClass}`;
  buttonContents.forEach((e) => {
    button.appendChild(e);
  });
  button.addEventListener("click", () => {
    exp.classList.toggle("expander-open");
  });

  const exp = document.createElement("div");
  exp.className = "expander";
  exp.appendChild(button);
  exp.appendChild(content);
  return exp;
}

/**
 * Adds a key-value row to a table.
 * @param {HTMLTableElement} table - The table to which the row will be appended.
 * @param {string} label - The label for the key (displayed in the first cell).
 * @param {HTMLElement} value - The value as an HTML element (displayed in the second cell).
 */
export function addKeyValueRowToTable(table, label, value) {
  const row = document.createElement("tr");

  const labelCell = document.createElement("td");
  labelCell.textContent = label;
  labelCell.className = "label-cell";

  const valueCell = document.createElement("td");
  valueCell.appendChild(value);
  valueCell.className = "value-cell";

  row.appendChild(labelCell);
  row.appendChild(valueCell);
  table.appendChild(row);
}

/**
 * Creates a table with key-value pairs from a JSON object.
 * @param {Object} obj - The object containing key-value pairs.
 * @param {Function} [valuefun=null] - A function to transform each value into an HTML element.
 * @returns {HTMLTableElement} - The created table element populated with key-value rows.
 */
export function createKeyValueTable(obj, valuefun = null) {
  const infoTable = document.createElement("table");
  infoTable.className = "info-table";

  for (const [key, val] of Object.entries(obj)) {
    const label = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter of the key

    let value;
    if (valuefun) {
      value = valuefun(val);
    } else {
      value = document.createElement("span");
      value.textContent = val;
    }

    addKeyValueRowToTable(infoTable, label, value);
  }

  return infoTable;
}

/**
 * Creates a basic text message dialog in the DOM.
 * @param {string} [id=null] - The ID to assign to the dialog element. If not provided, defaults to "messageDialog".
 */
export function createMessageDialog(id = null) {
  const messageDialog = document.createElement("dialog");
  messageDialog.id = id ?? "messageDialog";
  messageDialog.closedBy = "any";

  const dialogContent = document.createElement("div");
  dialogContent.className = "modal-content";

  const dialogHeader = document.createElement("div");
  dialogHeader.className = "modal-header";

  const dialogTitle = document.createElement("h2");
  dialogTitle.id = "dialogTitle";
  dialogHeader.appendChild(dialogTitle);

  const frm = document.createElement("form");
  frm.method = "dialog";
  const closeButton = document.createElement("button");
  closeButton.className = "modal-close";
  closeButton.value = "cancel";
  closeButton.setAttribute("aria-label", "Close");

  frm.appendChild(closeButton);
  dialogHeader.appendChild(frm);
  dialogContent.appendChild(dialogHeader);

  const dialogBody = document.createElement("div");
  dialogBody.className = "modal-body";

  const text = document.createElement("p");
  text.id = "dialogText";

  dialogBody.appendChild(text);
  dialogContent.appendChild(dialogBody);

  messageDialog.appendChild(dialogContent);
  document.body.appendChild(messageDialog);
}

/**
 * Displays a message in the dialog.
 * @param {string} message - The message to display inside the dialog.
 * @param {string} [id=null] - The ID of the dialog to show. If not provided, defaults to "messageDialog".
 */
export function showMessageDialog(message, title = null, id = null) {
  const msgText = document.getElementById("dialogText");
  if (msgText) msgText.textContent = message;

  const msgTitle = document.getElementById("dialogTitle");
  if (title && msgTitle) {
    msgTitle.textContent = title;
  }

  const dlg = document.getElementById(id ?? "messageDialog");
  if (dlg instanceof HTMLDialogElement && !dlg.open) dlg.showModal();
}

/**
 * Hides the message dialog.
 * @param {string} [id=null] - The ID of the dialog to hide. If not provided, defaults to "messageDialog".
 */
export function hideMessageDialog(id = null) {
  const dlg = document.getElementById(id ?? "messageDialog");
  if (dlg instanceof HTMLDialogElement && dlg.open) dlg.close();
}
