export class RadialProgress extends HTMLElement {
    constructor() {
        super();
        this._init();
    }

    static get observedAttributes() {
        return ['value', 'max', 'label', 'color', 'size'];
    }

    connectedCallback() {
        this.update();
    }

    attributeChangedCallback() {
        this.update();
    }

    set value(val) {
        this.setAttribute('value', val);
    }
    get value() {
        return this.getAttribute('value');
    }

    set max(val) {
        this.setAttribute('max', val);
    }
    get max() {
        return this.getAttribute('max');
    }

    set label(val) {
        this.setAttribute('label', val);
    }
    get label() {
        return this.getAttribute('label');
    }

    set color(val) {
        this.setAttribute('color', val);
    }
    get color() {
        return this.getAttribute('color');
    }

    set size(val) {
        this.setAttribute('size', val);
    }
    get size() {
        return this.getAttribute('size');
    }

    _init() {
        const container = document.createElement('div');
        container.className = 'radial-progress-container';
        this.appendChild(container);
        this.container = container;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 36 36');
        svg.classList.add('radial-progress-svg');
        container.appendChild(svg);
        this.svg = svg;

        const circleBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleBg.classList.add('radial-progress-circle-bg');
        circleBg.setAttribute('cx', '18');
        circleBg.setAttribute('cy', '18');
        circleBg.setAttribute('r', '16');
        svg.appendChild(circleBg);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.classList.add('radial-progress-circle');
        circle.setAttribute('cx', '18');
        circle.setAttribute('cy', '18');
        circle.setAttribute('r', '16');
        circle.setAttribute('stroke-dasharray', '0');
        circle.setAttribute('stroke-dashoffset', '0');
        svg.appendChild(circle);

        this.circle = circle;

        const labelDiv = document.createElement('div');
        labelDiv.className = 'radial-progress-label';
        container.appendChild(labelDiv);

        this.labelDiv = labelDiv;
    }

    update() {
        const color = this.getAttribute('color');
        const size = this.getAttribute('size');

        if (size) {
            this.container.style.width = size;
            this.container.style.height = size;
            this.svg.style.width = size;
            this.svg.style.height = size;
        }
        this.svg.style.display = 'block';
        if (color) this.circle.style.stroke = color;

        const value = Number(this.value) || 0;
        const max = Number(this.max) || 100;
        const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
        const r = 16;
        const c = 2 * Math.PI * r;
        const offset = c * (1 - percent / 100);
        this.circle.setAttribute('stroke-dasharray', `${c}`);
        this.circle.setAttribute('stroke-dashoffset', `${offset}`);
        this.labelDiv.textContent = this.label;
    }

    disconnectedCallback() { }
}

if (!customElements.get('radial-progress')) {
    customElements.define('radial-progress', RadialProgress);
}
