import React from 'react';
import Coordinate from '../coordinate';
import chess from '../chess';
import { EChessCamp, EMaxLength } from '@/types/enum/chess';

export default abstract class BaseChessPiece extends Coordinate {
  size: number = 50;

  children: React.ReactNode = '';

  checked: boolean = false;

  camp: EChessCamp = EChessCamp.han;

  points: [number, number][] = [];

  constructor(show?: string, x?: number, y?: number, size?: number) {
    super([x, y]);
    size && this.setSize(size);
    show && this.setChildren(show);
  }

  setPoints(points: [number, number][]) {
    this.points = points;
    return this;
  }

  setSize(size: number) {
    this.size = size;
    return this;
  }

  setChildren(children: React.ReactNode) {
    this.children = children;
    return this;
  }

  setCamp(camp: EChessCamp) {
    this.camp = camp;
    return this;
  }

  move(x: number, y: number) {
    this.moveX(x).moveY(y);
    return this;
  }

  moveByCoordinate(coordinate: [x: number, y: number]) {
    this.moveX(coordinate[0]).moveY(coordinate[1]);
    return this;
  }

  onFocus() {
    this.checked = true;
    return this;
  }

  onBlur() {
    this.checked = false;
    return this;
  }

  protected checkOtherRules(startIndex: number, index: number): boolean {
    return isNaN(startIndex + index);
  }

  /**
   * 根据棋子的移动规则计算calculatedPosition方向的可移动点位, 不同棋子可对其拓展
   * @param calculatedPosition 计算点位的坐标轴,x or y or -x or -y
   * @param index 当前坐标轴的calculatedPosition方向延伸的index
   * @returns (index: number) => [number, number]
   */
  protected getPointByIndex(calculatedPosition: 'x' | '-x' | 'y' | '-y') {
    return (index: number): [number, number] => {
      // 计算方向为x, 则 x 轴为可变换, 否则固定为当前x
      const x = calculatedPosition.includes('x') ? index : this.x;
      // 计算方向为y, 则 y 轴为可变换, 否则固定为当前y
      const y = calculatedPosition.includes('y') ? index : this.y;
      return [x, y];
    };
  }

  /**
   * 计算点位
   * @param start 当前位置,可为x或y
   * @param end 最大边界位置
   * @param points 点位收集列表
   * @param calculatedPosition 计算方向
   * @returns void
   */
  protected checkPoints(
    calculatedPosition: 'x' | '-x' | 'y' | '-y',
    start: number,
    end: number,
    points: [number, number][],
  ) {
    let i = start;
    const dic = calculatedPosition.includes('-');
    while (1) {
      if (dic ? i < end : i > end) {
        break;
      }
      if (!this.checkOtherRules(start, i)) {
        break;
      }
      // 获取点位根据当前棋子的坐标轴
      const point = this.getPointByIndex(calculatedPosition)(i);
      // 计算当前位置是否有棋子
      const p = chess.findOneByCoordinate(point);
      if (p) {
        // 有棋子,并且为非本阵营棋子, 则添加, 否则跳出循环
        p.camp !== this.camp && points.push(point);
        break;
      }
      points.push(point);
      dic && i--;
      !dic && i++;
    }
  }

  /**
   * 查找所有当前棋子可移动的点位
   * @returns [number, number][]
   */
  protected findPoints() {
    const points: [number, number][] = [];
    const Mx = EMaxLength.x - 1;
    const My = EMaxLength.y - 1;
    this.checkPoints('x', this.x + 1, Mx, points);
    this.checkPoints('-x', this.x - 1, 0, points);
    this.checkPoints('y', this.y + 1, My, points);
    this.checkPoints('-y', this.y - 1, 0, points);
    return points;
  }

  /**
   * 计算当前棋子可移动的点位
   */
  calculatePoints(): void {
    this.setPoints(this.findPoints());
  }
}
