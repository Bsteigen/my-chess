import { chessPieces as cps } from './init';
import { EChessCamp } from '@/types/enum/chess';

export class Chess {
  chessPieces: typeof cps = [];

  constructor() {
    this.chessPieces = cps;
  }

  findOneByCoordinate(position: [x: number, y: number]) {
    const item = this.chessPieces.filter(
      item => item.x === position[0] && item.y === position[1],
    )[0];
    return item;
  }

  delete(id: string) {
    const newCps = this.chessPieces.filter(item => item.id !== id);
    this.chessPieces = newCps;
  }

  changeCamp(camp: EChessCamp) {
    if (camp === EChessCamp.chu) {
      return EChessCamp.han;
    }
    return EChessCamp.chu;
  }
}

const chess = new Chess();

export default chess;
