import Jiang from '../jiang';
import type { Position } from '@/types';

export default class Shi extends Jiang {
  constructor(x?: number, y?: number, size?: number) {
    super(x, y, size);
    this.setChildren('仕');
  }

  protected updateChildrenIsChu(): void {
    this.setChildren('士');
  }

  protected getPointByIndex(
    calculatedPosition: Position,
    index: number,
  ): [number, number] {
    /**
     * (4, 1) (3, 0)
     * x (index, this.y - 1) (5, 0) (4, -1)
     * -x (index, this.y + 1) (3, 2) (2, 1)
     * y (this.x + 1, index) (5, 2) (4, 1)
     * -y (this.x - 1, index) (3, 0) (2, -1)
     */
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
}
