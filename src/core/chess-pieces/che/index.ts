import BaseChessPiece from '../baseChessPiece';

export default class Che extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('车', x, y, size);
  }
}
