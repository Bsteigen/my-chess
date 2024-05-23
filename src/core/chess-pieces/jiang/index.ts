import BaseChessPiece from '../baseChessPiece';
import { EChessCamp, EMaxLength } from '@/types/enum/chess';

export default class Jiang extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('帅', x, y, size);
  }

  protected getValue() {
    if (this.camp === EChessCamp.chu) {
      this.setChildren('将');
    }
    return this;
  }

  protected findPoints() {
    const points: [number, number][] = [];
    this.checkPoints('x', this.x + 1, 5, points);
    this.checkPoints('-x', this.x - 1, 3, points);
    this.checkPoints(
      'y',
      this.y + 1,
      this.camp === EChessCamp.chu ? EMaxLength.y - 1 : 2,
      points,
    );
    this.checkPoints(
      '-y',
      this.y - 1,
      this.camp === EChessCamp.chu ? EMaxLength.y - 3 : 0,
      points,
    );
    return points;
  }

  protected checkOtherRules(startIndex: number, index: number): boolean {
    return startIndex === index;
  }
}
