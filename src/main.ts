import './tabla-generica';
import './contador-cantidad';
import type { TablaGenerica } from './tabla-generica';
import type { ContadorCantidad } from './contador-cantidad';

interface Producto { id: string; nombre: string; precio: number; }
interface ItemCarrito extends Producto { cantidad: number; }

const productos: Producto[] = [
  { id: 'P-001', nombre: 'Tenis para correr', precio: 1299 },
  { id: 'P-002', nombre: 'Playera deportiva', precio: 399 },
  { id: 'P-003', nombre: 'Sudadera con capucha', precio: 749 },
];

// ----- Tabla del carrito (Parte A) -----
const tabla = document.querySelector<TablaGenerica>('#tabla-carrito')!;
tabla.columnas = [
  { clave: 'nombre',   titulo: 'Producto' },
  { clave: 'precio',   titulo: 'Precio' },
  { clave: 'cantidad', titulo: 'Cantidad' },
];
tabla.filas = [];

let carrito: ItemCarrito[] = [];

function agregar(p: Producto, cantidad: number) {
  const existente = carrito.find(i => i.id === p.id);
  if (existente) existente.cantidad += cantidad;
  else carrito.push({ ...p, cantidad });
  tabla.filas = [...carrito];   // arreglo nuevo para que se repinte
}

document.querySelector('#vaciar')!.addEventListener('click', () => {
  carrito = [];
  tabla.filas = [];             // vuelve a mostrar "Sin datos"
});

// ----- Lista de productos con el contador (Parte B) -----
const contenedor = document.querySelector('#productos')!;

for (const p of productos) {
  const fila = document.createElement('div');
  fila.className = 'producto';
  fila.innerHTML = `
    <span>${p.nombre} — $${p.precio}</span>
    <contador-cantidad valor="1" min="1" max="10"></contador-cantidad>
    <button>Agregar</button>
  `;

  const contador = fila.querySelector('contador-cantidad') as ContadorCantidad;
  contador.addEventListener('cambio', (e) => {
    console.log('Nueva cantidad:', (e as CustomEvent).detail.valor);
  });

  fila.querySelector('button')!.addEventListener('click', () => {
    agregar(p, contador.valor);
  });

  contenedor.append(fila);
}