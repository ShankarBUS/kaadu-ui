const chevronDown = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12"><path class="svg-path" d="M2.146 4.646a.5.5 0 0 1 .708 0L6 7.793l3.146-3.147a.5.5 0 1 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708"/></svg>`;

class ComboBox extends HTMLElement {
    constructor() {
        super();
        this.selectedItem = null;
        this.options = [];
        this._placeholder = '';
        this._init();
    }

    static get observedAttributes() {
        return ['placeholder'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder') {
            this.placeholder = newValue;
        }
    }

    get placeholder() {
        return this._placeholder;
    }

    set placeholder(value) {
        this._placeholder = value;
        if (this.textElement) {
            this.textElement.textContent = value;
        }
    }

    _init() {
        this.className = 'combo-box';
        this._createControl();
        this._createDropdown();
        this._addEventListeners();
    }

    _createControl() {
        const button = document.createElement('button');
        button.className = 'combo-box-button';

        const textElement = document.createElement('span');
        textElement.className = 'combo-box-text';
        textElement.textContent = this._placeholder;

        const chevronIcon = document.createElement('span');
        chevronIcon.className = 'combo-box-chevron';
        chevronIcon.innerHTML = chevronDown;

        button.appendChild(textElement);
        button.appendChild(chevronIcon);

        this.appendChild(button);
        this.textElement = textElement;
        this.button = button;
    }

    _createDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = 'combo-box-dropdown';
        this.appendChild(dropdown);
        this.dropdown = dropdown;
    }

    _addEventListeners() {
        this.button.addEventListener('click', () => this._toggleDropdown());
        document.addEventListener('click', (e) => {
            if (!this.button.contains(e.target)) this._closeDropdown();
        });
    }

    loadOptions(options) {
        this.options = options;
        this._renderOptions();
    }

    _renderOptions() {
        this.dropdown.innerHTML = '';
        this.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'combo-box-option';
            optionEl.dataset.value = option.value;

            const textSpan = document.createElement('span');
            textSpan.className = 'combo-box-text';
            textSpan.textContent = option.label;

            optionEl.title = option.label;
            optionEl.appendChild(textSpan);
            optionEl.addEventListener('click', (e) => this._selectOption(optionEl.dataset.value));
            this.dropdown.appendChild(optionEl);
        });
    }

    getSelectedItem() {
        return this.selectedItem;
    }

    setSelectedItem(value) {
        const option = this.options.find(opt => opt.value === value);
        if (option) {
            this.selectedItem = option;
            this.textElement.textContent = option.label;
        }
    }

    _selectOption(value) {
        this.setSelectedItem(value);
        this._closeDropdown();
        this.dispatchEvent(new CustomEvent('selectionChanged', { detail: this.selectedItem }));
    }

    _toggleDropdown() {
        this.classList.toggle('open');
    }

    _closeDropdown() {
        this.classList.remove('open');
    }
}

customElements.define('combo-box', ComboBox);
