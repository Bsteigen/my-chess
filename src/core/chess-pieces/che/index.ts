import BaseChessPiece from '../baseChessPiece';

export default class Che extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('車', x, y, size);
  }
}
