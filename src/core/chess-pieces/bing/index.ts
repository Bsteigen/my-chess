import BaseChessPiece from '../baseChessPiece';
import { EChessCamp } from '@/types/enum/chess';

export default class Bing extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('兵', x, y, size);
  }

  getValue() {
    if (this.camp === EChessCamp.chu) {
      this.setChildren('卒');
    }
    return this;
  }

  calculatePoints(): void {
    if (this.camp === EChessCamp.han) {
      if (this.y >= 3 && this.y < 5) {
        this.setPoints([[this.x, this.y + 1]]);
      } else if (this.y >= 5 && this.y < 10) {
        this.setPoints([
          [this.x, this.y + 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
        ]);
      }
    } else if (this.camp === EChessCamp.chu) {
      if (this.y === 6 || this.y === 5) {
        this.setPoints([[this.x, this.y - 1]]);
      } else if (this.y >= 0 && this.y < 5) {
        this.setPoints([
          [this.x, this.y - 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
        ]);
      }
    }
  }
}
