class Mapa {
  constructor(mapa) {
    this.guia = mapa;
  }

  draw() {
    for (let fila = 0; fila < this.guia.matriz.length; fila++) {
      let columnas = this.guia.matriz[fila].length;
      for (let columna = 0; columna < columnas; columna++) {
        image(
          sprites.tiles[
            this.guia.rutas[Number(this.guia.matriz[fila][columna])]
          ],
          ESCALA_UNIDAD * columna,
          ESCALA_UNIDAD * fila,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        );
      }
    }
  }
}
