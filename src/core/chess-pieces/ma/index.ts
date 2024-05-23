import BaseChessPiece from '../baseChessPiece';

export default class Ma extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('马', x, y, size);
  }
}
