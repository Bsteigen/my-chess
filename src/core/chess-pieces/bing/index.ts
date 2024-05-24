import BaseChessPiece from '../baseChessPiece';
import { Position } from '@/types';
import { EChessCamp } from '@/types/enum/chess';

export default class Bing extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('兵', x, y, size);
  }

  protected getValue() {
    if (this.camp === EChessCamp.chu) {
      this.setChildren('卒');
    }
    return this;
  }

  protected findPoints() {
    if (this.camp === EChessCamp.han) {
      if (this.y < 5 && this.y >= 3) {
        this.checkMoveS();
      } else if (this.y >= 5) {
        this.checkMoveE();
        this.checkMoveW();
        this.checkMoveS();
      }
    } else if (this.camp === EChessCamp.chu) {
      if (this.y > 4 && this.y <= 6) {
        this.checkMoveN();
      } else if (this.y <= 4) {
        this.checkMoveE();
        this.checkMoveW();
        this.checkMoveN();
      }
    }
  }

  protected checkOtherRules(
    position: Position,
    startIndex: number,
    index: number,
  ): boolean {
    // 一次只移动一步
    return startIndex === index;
  }
}
