import { v4 as uuid } from 'uuid';
import { Point } from '@/types';
import { EItemType } from '@/types/enum/chess';

export default class Coordinate {
  x: number = 0;

  y: number = 0;

  size: number = 5;

  id: string = uuid();

  type = EItemType.POINT;

  constructor(point: Partial<Point>) {
    point[0] && this.moveX(point[0]);
    point[1] && this.moveY(point[1]);
  }

  moveX(x: number) {
    this.x = x;
    return this;
  }

  moveY(y: number) {
    this.y = y;
    return this;
  }

  getCoordinate(): Point {
    return [this.x, this.y];
  }

  protected getValue() {
    return this;
  }
}
