import BaseChessPiece from '../baseChessPiece';
import type { Position } from '@/types';
import { EChessCamp, EMaxLength } from '@/types/enum/chess';

export default class Jiang extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('帅', x, y, size);
    this.setMoveScope({ x: [3, 5], y: [0, 2] });
  }

  protected updateChildrenIsChu(): void {
    this.setChildren('将');
  }

  setCamp(camp: EChessCamp) {
    if (camp === EChessCamp.chu) {
      this.updateChildrenIsChu();
      this.setMoveScope({ y: [EMaxLength.y - 3, EMaxLength.y - 1] });
    }
    return super.setCamp(camp);
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
