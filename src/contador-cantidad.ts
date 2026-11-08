import estilos from './contador-cantidad.css?inline';

export class ContadorCantidad extends HTMLElement {
  static observedAttributes = ['valor', 'min', 'max'];

  private spanValor: HTMLSpanElement;
  private btnMenos: HTMLButtonElement;
  private btnMas: HTMLButtonElement;

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.innerHTML = `
      <style>${estilos}</style>
      <button class="menos" aria-label="Menos">−</button>
      <span></span>
      <button class="mas" aria-label="Más">+</button>
    `;
    this.btnMenos = sombra.querySelector('.menos')!;
    this.btnMas = sombra.querySelector('.mas')!;
    this.spanValor = sombra.querySelector('span')!;

    this.btnMenos.addEventListener('click', () => this.cambiar(-1));
    this.btnMas.addEventListener('click', () => this.cambiar(1));
  }

  get min(): number { return Number(this.getAttribute('min') ?? 0); }
  get max(): number { return Number(this.getAttribute('max') ?? 10); }
  get valor(): number { return Number(this.getAttribute('valor') ?? this.min); }
  set valor(v: number) { this.setAttribute('valor', String(v)); }

  connectedCallback() { this.pintar(); }
  attributeChangedCallback() { this.pintar(); }

  private cambiar(delta: number) {
    const nuevo = Math.min(this.max, Math.max(this.min, this.valor + delta));
    if (nuevo === this.valor) return;   // ya está en el límite
    this.valor = nuevo;
    this.dispatchEvent(new CustomEvent('cambio', {
      detail: { valor: nuevo },
      bubbles: true,
      composed: true,
    }));
  }

  private pintar() {
    this.spanValor.textContent = String(this.valor);
    this.btnMenos.disabled = this.valor <= this.min;
    this.btnMas.disabled = this.valor >= this.max;
  }
}

customElements.define('contador-cantidad', ContadorCantidad);