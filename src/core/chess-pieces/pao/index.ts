import BaseChessPiece from '../baseChessPiece';

export default class Pao extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('炮', x, y, size);
  }

  protected checkExtraPoints(chessPieces: BaseChessPiece[]) {
    const p = chessPieces[1];
    p && p.camp !== this.camp && this.points.push(p.getCoordinate());
  }
}
