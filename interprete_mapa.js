let paso_noise = 0.005;

class Mapa {
  constructor(mapa) {
    this.guia = mapa;
  }

  draw() {
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

        try {
          image(
            sprites.tiles[this.guia.rutas[index.index]],
            ESCALA_UNIDAD * columna,
            ESCALA_UNIDAD * fila,
            ESCALA_UNIDAD,
            ESCALA_UNIDAD
          );
        } catch (error) {
          let n = noise(columna * paso_noise + 1000, fila * paso_noise + 2000);
          print(n);
          let ajustador = floor(map(n, 0, 1, 0, mapa1.rutas.length - 1));
          print(ajustador);
        }
      }
    }
  }
}

function indexPerlinNoise(columna, fila) {
  let n = noise(columna * paso_noise + 1000, fila * paso_noise + 2000);
  if (n > 1) {
    n = 1;
  }
  let ajustador = floor(map(n, 0, 1, 0, mapa1.rutas.length - 1));
  switch (ajustador) {
    case 0:
      return {//pasto oscuro
        index: 0,
        color: [0, 200, 0],
      };
    case 1:
      return {//Pasto medio
        index: 1,
        color: [0, 220, 0],
      };
    case 2:
      return {//Pasto claro
        index: 2,
        color: [0, 255, 0],
      };
    case 3:
      return {//arena
        index: 3,
        color: [255, 200, 50],
      };
    case 4:
      return {
        //tierra
        index: 5,
        color: [200, 100, 0],
      };
    case 5:
      return {
        //nieve
        index: 4,
        color: [234, 243, 255],
      };
  }
}