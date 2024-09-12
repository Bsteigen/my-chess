import BaseChessPiece from '../baseChessPiece';
import chess from '@/core/chess';
import type { Point, Position } from '@/types';

export default class Ma extends BaseChessPiece {
  private needRemovePoints: Point[] = [];

  private stumblingBlocksPoints: {
    stumblingBlock: Point;
    points: Point[];
  }[] = [];

  constructor(x?: number, y?: number, size?: number) {
    super('馬', x, y, size);
  }

  protected checkOtherRules(
    position: Position,
    startIndex: number,
    index: number,
  ): boolean {
    return index === startIndex;
  }

  moveByCoordinate(coordinate: Point): this {
    this.needRemovePoints = [];
    return super.moveByCoordinate(coordinate);
  }

  onFocus(): this {
    this.needRemovePoints = [];
    this.initStumblingBlocksPoints();
    return super.onFocus();
  }

  protected findPoints(): void {
    this.setMoveStep(1);
    super.findPoints();
    this.setMoveStep(2);
    super.findPoints();
  }

  protected getPointByIndex(
    calculatedPosition: Position,
    index: number,
  ): Point {
    switch (calculatedPosition) {
      case 'x':
        return [index, this.getMoveStep() === 1 ? this.y - 2 : this.y - 1];
      case '-x':
        return [index, this.getMoveStep() === 1 ? this.y + 2 : this.y + 1];
      case 'y':
        return [this.getMoveStep() === 1 ? this.x + 2 : this.x + 1, index];
      case '-y':
        return [this.getMoveStep() === 1 ? this.x - 2 : this.x - 1, index];
      default:
        return [-1, -1];
    }
  }

  protected checkConformToRules(point: Point): boolean {
    if (this.needRemovePoints.length === 0) {
      for (const sbp of this.stumblingBlocksPoints) {
        const p = chess.findOneByCoordinate(sbp.stumblingBlock);
        p && this.needRemovePoints.push(...sbp.points);
      }
    }
    const needRemove = this.needRemovePoints.some(
      p => p[0] === point[0] && p[1] === point[1],
    );
    return !needRemove && super.checkConformToRules(point);
  }

  private initStumblingBlocksPoints() {
    const { x, y } = this;
    this.stumblingBlocksPoints = [
      {
        stumblingBlock: [x, y - 1],
        points: [
          [x - 1, y - 2],
          [x + 1, y - 2],
        ],
      },
      {
        stumblingBlock: [x - 1, y],
        points: [
          [x - 2, y - 1],
          [x - 2, y + 1],
        ],
      },
      {
        stumblingBlock: [x + 1, y],
        points: [
          [x + 2, y - 1],
          [x + 2, y + 1],
        ],
      },
      {
        stumblingBlock: [x, y + 1],
        points: [
          [x - 1, y + 2],
          [x + 1, y + 2],
        ],
      },
    ];
  }
}
/**
 * #                          (2,3)
 * @     [2,2]         [1,3]         [3,3]        [2,4]
 * & [1,1], [3,1], [0,2], [0,4], [4,2], [4,4], [1,5], [3,5]
 * 0 0 1 2 3 4 5 6 7 8
 * 1 0 & 0 & 0 0 0 0 0
 * 2 & 0 @ 0 & 0 0 0 0
 * 3 0 @ # @ 0 0 0 0 0
 * 4 & 0 @ 0 & 0 0 0 0
 * 5 0 & 0 & 0 0 0 0 0
 * 6 0 0 0 0 0 0 0 0 0
 * 7 0 0 0 0 0 0 0 0 0
 * 8 0 0 0 0 0 0 0 0 0
 * 9 0 0 0 0 0 0 0 0 0
 *
 * * [x-2, y-1] [0, 2] -y
 * [x-2, y+1] [0, 4] -2x
 * [x-1, y-2] [1, 1] -2y
 * [x-1, y+2] [1, 5] -x
 * [x+1, y-2] [3, 1] x
 * [x+1, y+2] [3, 5] 2y
 * [x+2, y-1] [4, 2] 2x
 * [x+2, y+1] [4, 4] y
 */
