import init, { TChessPieces } from './init';
import type { Point } from '@/types';
import { EChessCamp } from '@/types/enum/chess';

export class Chess {
  chessPieces: TChessPieces = [];
  camp: EChessCamp = EChessCamp.han;

  constructor() {
    this.init();
  }

  init() {
    this.chessPieces = init();
  }

  findOneByCoordinate(position: Point) {
    const item = this.chessPieces.filter(
      item => item.x === position[0] && item.y === position[1],
    )[0];
    return item;
  }

  findOneById(id: string) {
    const item = this.chessPieces.filter(item => item.id === id)[0];
    return item;
  }

  resetChecked() {
    this.chessPieces.forEach(item => item.onBlur());
  }

  selected(id: string) {
    let newItem;
    for (const item of this.chessPieces) {
      if (item.checked) item.onBlur();
      if (item.id === id) {
        item.onFocus();
        item.calculatePoints();
        newItem = item;
      }
    }
    return newItem;
  }

  delete(id: string) {
    const newCps = this.chessPieces.filter(item => item.id !== id);
    this.chessPieces = newCps;
  }

  changeCamp() {
    if (this.camp === EChessCamp.chu) {
      this.camp = EChessCamp.han;
    } else {
      this.camp = EChessCamp.chu;
    }
  }

  getCamp() {
    return this.camp;
  }
}

const chess = new Chess();

export default chess;
