import React from 'react';
import Coordinate from '../coordinate';
import chess from '../chess';
import { EChessCamp, EMaxLength } from '@/types/enum/chess';
import type { Point, Position } from '@/types';

const Mx = EMaxLength.x - 1;
const My = EMaxLength.y - 1;
export default abstract class BaseChessPiece extends Coordinate {
  size: number = 5;

  children: React.ReactNode = '';

  checked: boolean = false;

  camp: EChessCamp = EChessCamp.han;

  points: Point[] = [];

  // 棋子的移动范围
  protected moveScope: {
    x: [min: number, max: number];
    y: [min: number, max: number];
  } = { x: [0, Mx], y: [0, My] };

  protected moveStep: number = 1;

  constructor(show?: string, x?: number, y?: number, size?: number) {
    super([x, y]);
    size && this.setSize(size);
    show && this.setChildren(show);
  }

  protected setMoveStep(step: number) {
    this.moveStep = step;
    return this;
  }

  protected getMoveStep() {
    return this.moveStep;
  }

  setPoints(points: Point[]) {
    this.points = points;
    return this;
  }

  setSize(size: number) {
    this.size = size;
    return this;
  }

  protected setChildren(children: React.ReactNode) {
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

  protected setMoveScope(scope: {
    x?: [min: number, max: number] | [min: number];
    y?: [min: number, max: number] | [min: number];
  }) {
    if (scope.x) {
      scope.x.forEach((v, i) => {
        this.moveScope.x[i] = v;
      });
    }
    if (scope.y) {
      scope.y.forEach((v, i) => {
        this.moveScope.y[i] = v;
      });
    }
    return this;
  }

  /**
   * 移动到指定点位
   * @param coordinate 坐标点位
   * @returns this
   */
  moveByCoordinate(coordinate: Point) {
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

  protected checkOtherRules(
    position: Position,
    startIndex: number,
    index: number,
  ): boolean;

  protected checkOtherRules() {
    return true;
  }

  protected checkExtraPoints(chessPieces: BaseChessPiece[]) {
    const p = chessPieces[0];
    p && p.camp !== this.camp && this.points.push(p.getCoordinate());
  }

  /**
   * 根据棋子的移动规则计算calculatedPosition方向的可移动点位, 不同棋子可对其拓展
   * @param calculatedPosition 计算点位的坐标轴,x or y or -x or -y
   * @param index 当前坐标轴的calculatedPosition方向延伸的index
   * @returns (index: number) => Point
   */
  protected getPointByIndex(
    calculatedPosition: Position,
    index: number,
  ): Point {
    // 计算方向为x, 则 x 轴为可变换, 否则固定为当前x
    const x = calculatedPosition.includes('x') ? index : this.x;
    // 计算方向为y, 则 y 轴为可变换, 否则固定为当前y
    const y = calculatedPosition.includes('y') ? index : this.y;
    return [x, y];
  }

  /**
   * 计算空白点位
   * @param calculatedPosition 计算方向
   * @param start 当前位置,可为x或y
   * @param end 最大边界位置
   * @returns void
   */
  protected checkPoints(
    calculatedPosition: Position,
    start: number,
    end: number,
  ) {
    let i = start;
    const dic = calculatedPosition.includes('-');
    const chessPieces: BaseChessPiece[] = [];
    while (1) {
      if (dic ? i < end : i > end) {
        break;
      }
      if (!this.checkOtherRules(calculatedPosition, start, i)) {
        break;
      }
      // 获取点位根据当前棋子的坐标轴
      const point = this.getPointByIndex(calculatedPosition, i);
      // 计算点位是否超出边界 超出边界不处理
      if (this.checkConformToRules(point)) {
        // 计算当前位置是否有棋子
        const p = chess.findOneByCoordinate(point);
        if (p) {
          chessPieces.push(p);
        }
        // 当遇到棋子时,不在添加空白点位
        if (chessPieces.length === 0) {
          this.points.push(point);
        }
      }
      if (dic) {
        i -= this.getMoveStep();
      } else {
        i += this.getMoveStep();
      }
    }
    this.checkExtraPoints(chessPieces);
  }

  protected checkConformToRules(point: Point): boolean {
    const { x, y } = this.moveScope;
    return (
      point[0] >= x[0] &&
      point[0] <= x[1] &&
      point[1] >= y[0] &&
      point[1] <= y[1]
    );
  }

  /**
   * 查找所有当前棋子可移动的点位
   * @returns
   */
  protected findPoints() {
    // 以当前坐标为原点, 延x轴正向计算
    this.checkMoveE();
    // 以当前坐标为原点, 延x轴负向计算
    this.checkMoveW();
    // 以当前坐标为原点, 延y轴正向计算
    this.checkMoveS();
    // 以当前坐标为原点, 延y轴负向计算
    this.checkMoveN();
  }

  /**
   *  以当前坐标为原点, 延x轴正向计算 x
   */
  protected checkMoveE() {
    this.checkPoints('x', this.x + this.getMoveStep(), this.moveScope.x[1]);
  }

  /**
   * 以当前坐标为原点, 延x轴负向计算 -x
   */
  protected checkMoveW() {
    this.checkPoints('-x', this.x - this.getMoveStep(), this.moveScope.x[0]);
  }

  /**
   * 以当前坐标为原点, 延y轴正向计算 y
   */
  protected checkMoveS() {
    this.checkPoints('y', this.y + this.getMoveStep(), this.moveScope.y[1]);
  }

  /**
   * 以当前坐标为原点, 延y轴负向计算 -y
   */
  protected checkMoveN() {
    this.checkPoints('-y', this.y - this.getMoveStep(), this.moveScope.y[0]);
  }

  /**
   * 计算当前棋子可移动的点位
   */
  calculatePoints(): void {
    this.setPoints([]);
    this.findPoints();
  }
}
