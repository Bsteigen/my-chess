import BaseChessPiece from '../baseChessPiece';
import type { Position } from '@/types';
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

  protected checkMoveE(): void {
    this.checkPoints('x', this.x + 1, 5);
  }

  protected checkMoveW(): void {
    this.checkPoints('-x', this.x - 1, 3);
  }

  protected checkMoveS(): void {
    if (this.camp === EChessCamp.chu) {
      this.checkPoints('y', this.y + 1, EMaxLength.y - 1);
    }
    if (this.camp === EChessCamp.han) {
      this.checkPoints('y', this.y + 1, 2);
    }
  }

  protected checkMoveN(): void {
    if (this.camp === EChessCamp.chu) {
      this.checkPoints('-y', this.y - 1, EMaxLength.y - 3);
    }
    if (this.camp === EChessCamp.han) {
      this.checkPoints('-y', this.y - 1, 0);
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
