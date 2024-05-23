import BaseChessPiece from '../baseChessPiece';

export default class Xiang extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('象', x, y, size);
  }
}
