import Bing from '../chess-pieces/bing';
import Che from '../chess-pieces/che';
import Ma from '../chess-pieces/ma';
import Xiang from '../chess-pieces/xiang';
import Shi from '../chess-pieces/shi';
import Jiang from '../chess-pieces/jiang';
import Pao from '../chess-pieces/pao';
import { EChessCamp } from '@/types/enum/chess';

export const chessPieces = [
  new Che(0, 0).setCamp(EChessCamp.han),
  new Che(8, 0).setCamp(EChessCamp.han),
  new Bing(0, 3).setCamp(EChessCamp.han),
  new Bing(2, 3).setCamp(EChessCamp.han),
  new Bing(4, 3).setCamp(EChessCamp.han),
  new Bing(6, 3).setCamp(EChessCamp.han),
  new Bing(8, 3).setCamp(EChessCamp.han),
  new Ma(1, 0).setCamp(EChessCamp.han),
  new Ma(7, 0).setCamp(EChessCamp.han),
  new Xiang(2, 0).setCamp(EChessCamp.han),
  new Xiang(6, 0).setCamp(EChessCamp.han),
  new Shi(3, 0).setCamp(EChessCamp.han),
  new Shi(5, 0).setCamp(EChessCamp.han),
  new Jiang(4, 0).setCamp(EChessCamp.han),
  new Pao(1, 2).setCamp(EChessCamp.han),
  new Pao(7, 2).setCamp(EChessCamp.han),

  new Che(0, 9).setCamp(EChessCamp.chu),
  new Che(8, 9).setCamp(EChessCamp.chu),
  new Bing(0, 6).setCamp(EChessCamp.chu),
  new Bing(2, 6).setCamp(EChessCamp.chu),
  new Bing(4, 6).setCamp(EChessCamp.chu),
  new Bing(6, 6).setCamp(EChessCamp.chu),
  new Bing(8, 6).setCamp(EChessCamp.chu),
  new Ma(1, 9).setCamp(EChessCamp.chu),
  new Ma(7, 9).setCamp(EChessCamp.chu),
  new Xiang(2, 9).setCamp(EChessCamp.chu),
  new Xiang(6, 9).setCamp(EChessCamp.chu),
  new Shi(3, 9).setCamp(EChessCamp.chu),
  new Shi(5, 9).setCamp(EChessCamp.chu),
  new Jiang(4, 9).setCamp(EChessCamp.chu),
  new Pao(1, 7).setCamp(EChessCamp.chu),
  new Pao(7, 7).setCamp(EChessCamp.chu),
];
