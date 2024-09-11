import BaseChessPiece from '../baseChessPiece';
import chess from '@/core/chess';
import type { Point, Position } from '@/types';
import { EChessCamp, EMaxLength } from '@/types/enum/chess';

export default class Xiang extends BaseChessPiece {
  constructor(x?: number, y?: number, size?: number) {
    super('象', x, y, size);
    this.setMoveScope({ y: [0, 4] });
    this.setMoveStep(2);
  }

  setCamp(camp: EChessCamp): this {
    if (camp === EChessCamp.chu) {
      this.setMoveScope({ y: [EMaxLength.y - 5, EMaxLength.y - 1] });
    }
    return super.setCamp(camp);
  }

  protected checkOtherRules(
    position: Position,
    startIndex: number,
    index: number,
  ): boolean {
    return startIndex === index;
  }

  protected getPointByIndex(
    calculatedPosition: Position,
    index: number,
  ): Point {
    switch (calculatedPosition) {
      case 'x':
        return [index, this.y - this.getMoveStep()];
      case '-x':
        return [index, this.y + this.getMoveStep()];
      case 'y':
        return [this.x + this.getMoveStep(), index];
      case '-y':
        return [this.x - this.getMoveStep(), index];
      default:
        return [-1, -1];
    }
  }

  protected checkConformToRules(point: Point): boolean {
    /**
     * 排除象的中间有棋子的点位
     *  *[4, 2]
     * [6, 4] (5,3)
     * [2, 4] (3,3)
     * [6, 0] (5,1)
     * [2, 0] (3,1)
     */
    const p = chess.findOneByCoordinate([
      (this.x + point[0]) / 2,
      (this.y + point[1]) / 2,
    ]);
    return !p && super.checkConformToRules(point);
  }
}
