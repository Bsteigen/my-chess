import Jiang from '../jiang';

export default class Shi extends Jiang {
  protected getValue(): this {
    this.setChildren('士');
    return this;
  }

  protected getPointByIndex(
    calculatedPosition: 'x' | '-x' | 'y' | '-y',
  ): (index: number) => [number, number] {
    const dic = calculatedPosition.includes('-');
    const baseX = dic ? this.x - 1 : this.x + 1;
    const baseY = dic ? this.y - 1 : this.y + 1;
    return (index: number): [number, number] => {
      // 计算方向为x, 则 x 轴为可变换, 否则固定为当前x
      const x = calculatedPosition.includes('x') ? index : baseX;
      // 计算方向为y, 则 y 轴为可变换, 否则固定为当前y
      const y = calculatedPosition.includes('y') ? index : baseY;
      return [x, y];
    };
  }
}
