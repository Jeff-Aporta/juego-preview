const INDEX_TILE_PASTO_1 = 0;
const INDEX_TILE_PASTO_2 = 1;
const INDEX_TILE_PASTO_3 = 2;
const INDEX_TILE_ARENA = 3;
const INDEX_TILE_NIEVE = 4;
const INDEX_TILE_TIERRA = 5;
const INDEX_TILE_AGUA = 6;

rutas_tiles = [
  "https://i.ibb.co/jR2NTnk/grass-tile-1.png",
  "https://i.ibb.co/hLyzHXc/grass-tile-2.png",
  "https://i.ibb.co/Z8DzY5N/grass-tile-3.png",
  "https://i.ibb.co/PxJdYHd/sand-tile.png",
  "https://i.ibb.co/m99NYxM/Sin-t-tulo-1.png",
  "https://i.ibb.co/pfsT7z5/tierra.png",
  "https://i.ibb.co/NTvPHG4/CK2ea0R.gif",
];

let paso_noise = 0.0025;

let n_mas_alto = 0;
let n_mas_bajo = 10000;

class Mapa {
  constructor() {
    for (let fila = 0; fila < 500; fila++) {
      for (let columna = 0; columna < 500; columna++) {
        let n = noise(columna * paso_noise, fila * paso_noise);
        if (n > n_mas_alto) {
          n_mas_alto = n;
        }
        if (n < n_mas_bajo) {
          n_mas_bajo = n;
        }
      }
    }
    print("Perlin mayor = " + n_mas_alto);
    print("Perlin menor = " + n_mas_bajo);
  }

  draw() {
    let agua = sprites.tiles[rutas_tiles[INDEX_TILE_AGUA]];
    agua.setFrame(Math.floor(agua.aframe));
    agua.aframe = (agua.aframe + 0.2) % agua.numFrames();

    for (let fila = jugador.cy - 8; fila < jugador.cy + 8; fila++) {
      for (let columna = jugador.cx - 8; columna < jugador.cx + 8; columna++) {
        /* image(
          sprites.tiles[
            this.guia.rutas[Number(this.guia.matriz[fila][columna])]
          ],
          ESCALA_UNIDAD * columna,
          ESCALA_UNIDAD * fila,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        ); */
        let index = indexPerlinNoise(columna, fila);

        push();
        try {
          let img = sprites.tiles[rutas_tiles[index.index]];
          switch (index.index) {
            case 6:
              image(
                sprites.tiles[rutas_tiles[5]],
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              drawingContext.globalAlpha = 0.3;
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD,
                ((abs(columna + 1000000) % 3) * img.width) / 3,
                ((abs(fila + 1000000) % 3) * img.height) / 3,
                img.width / 3,
                img.height / 3
              );
              break;
            default:
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              break;
          }
        } catch (error) {
          let n = noise(columna * paso_noise + 1000, fila * paso_noise + 2000);
          let ajustador = floor(
            map(n, n_mas_bajo, n_mas_alto, 0, rutas_tiles.length)
          );
          print("columna: " + columna);
          print("fila: " + fila);
          print("noise: " + n);
          print("noise menor: " + n_mas_bajo);
          print("noise mayor: " + n_mas_alto);
          print("tile: " + ajustador);
          text(
            "X",
            ESCALA_UNIDAD * columna,
            ESCALA_UNIDAD * fila,
            ESCALA_UNIDAD,
            ESCALA_UNIDAD
          );
        }
        pop();
      }
    }
  }
}

function indexPerlinNoise(columna, fila) {
  let n = noise(columna * paso_noise + 1000, fila * paso_noise + 2000);
  if (n > n_mas_alto) {
    n_mas_alto = n;
    print("Nuevo Perlin mayor = " + n_mas_alto);
  }
  if (n < n_mas_bajo) {
    n_mas_bajo = n;
    print("Nuevo Perlin menor = " + n_mas_bajo);
  }
  let ajustador = floor(
    map(n, n_mas_bajo - 0.001, n_mas_alto + 0.001, 0, rutas_tiles.length)
  );
  switch (ajustador) {
    case 0:
      return {
        index: INDEX_TILE_NIEVE,
        color: [234, 243, 255],
      };
    case 1:
      return {
        index: INDEX_TILE_ARENA,
        color: [255, 200, 50],
      };
    case 2:
      return {
        index: INDEX_TILE_PASTO_1,
        color: [0, 200, 0],
      };
    case 3:
      return {
        index: INDEX_TILE_PASTO_2,
        color: [0, 220, 0],
      };
    case 4:
      return {
        index: INDEX_TILE_PASTO_3,
        color: [0, 255, 0],
      };
    case 5:
      return {
        index: INDEX_TILE_TIERRA,
        color: [200, 100, 0],
      };
    case 6:
      return {
        index: INDEX_TILE_AGUA,
        color: [94, 143, 114],
      };
  }
}
