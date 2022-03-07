let paso_noise = 0.01;

class Mapa {
  constructor(mapa) {
    this.guia = mapa;
  }

  draw() {
    noiseSeed(1);
    noiseDetail(11, 0.65);
    for (
      let fila = floor(jugador.y / ESCALA_UNIDAD) - 10;
      fila < floor(jugador.y / ESCALA_UNIDAD) + 10;
      fila++
    ) {
      for (
        let columna = floor(jugador.x / ESCALA_UNIDAD) - 10;
        columna < floor(jugador.x / ESCALA_UNIDAD) + 10;
        columna++
      ) {
        /* image(
          sprites.tiles[
            this.guia.rutas[Number(this.guia.matriz[fila][columna])]
          ],
          ESCALA_UNIDAD * columna,
          ESCALA_UNIDAD * fila,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        ); */
        let index = 0;
        let n = noise(columna * paso_noise + 1000, fila * paso_noise + 2000);
        if (n < 0.5) {
          index = 0;
        } else if (n < 0.66) {
          index = 1;
        } else if (n < 0.82) {
          index = 2;
        } else if (n < 1) {
          index = 3;
        }

        image(
          sprites.tiles[this.guia.rutas[index]],
          ESCALA_UNIDAD * columna,
          ESCALA_UNIDAD * fila,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        );
      }
    }
  }
}
