import estilos from './tabla-generica.css?inline';

export interface Columna {
  clave: string;   // para buscar el dato dentro de cada objeto
  titulo: string;  // texto que se muestra en el encabezado
}

export type Fila = object;   // cualquier objeto: productos, alumnos, etc.

export class TablaGenerica extends HTMLElement {
  private _columnas: Columna[] = [];
  private _filas: Fila[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Propiedades, no atributos: un atributo solo guarda texto y esto son arreglos
  set columnas(v: Columna[]) { this._columnas = v; this.pintar(); }
  get columnas(): Columna[] { return this._columnas; }

  set filas(v: Fila[]) { this._filas = v; this.pintar(); }
  get filas(): Fila[] { return this._filas; }

  connectedCallback() { this.pintar(); }

  private pintar() {
    const encabezados = this._columnas.map(c => `<th>${c.titulo}</th>`).join('');

    let cuerpo = '';
    if (this._filas.length === 0) {
      cuerpo = `<tr><td class="vacio" colspan="${this._columnas.length || 1}">Sin datos</td></tr>`;
    } else {
      for (const fila of this._filas) {
        cuerpo += '<tr>';
        for (const c of this._columnas) {
          const dato = (fila as Record<string, unknown>)[c.clave];
          cuerpo += `<td>${dato ?? ''}</td>`;
        }
        cuerpo += '</tr>';
      }
    }

    this.shadowRoot!.innerHTML = `
      <style>${estilos}</style>
      <table>
        <thead><tr>${encabezados}</tr></thead>
        <tbody>${cuerpo}</tbody>
      </table>
    `;
  }
}

customElements.define('tabla-generica', TablaGenerica);