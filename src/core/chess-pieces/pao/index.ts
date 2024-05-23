import BaseChessPiece from '../baseChessPiece';

export default class Pao extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('炮', x, y, size);
  }
}
