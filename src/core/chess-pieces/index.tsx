import { useMemo, useState } from 'react';
import chess from '../chess';
import BaseChessPiece from '@/core/chess-pieces/baseChessPiece';
import { EChessCamp } from '@/types/enum/chess';
import Coordinate from '@/core/coordinate';

// 棋子组件，用于展示棋盘上的棋子及其行为
export default function ChessPieces() {
  // 当前选中的棋子
  const [selected, setSelected] = useState<BaseChessPiece>();
  // 当前行动的阵营
  const [currentCamp, setCurrentCamp] = useState<EChessCamp>(EChessCamp.han);

  console.log(selected, 'selected');

  // 处理坐标点击事件
  const handleCoordinates = (item: Coordinate) => {
    if (!selected) {
      return;
    }
    if (selected.camp === currentCamp) {
      selected.onBlur();
      const cp = chess.findOneByCoordinate(item.getCoordinate());
      selected.moveByCoordinate(item.getCoordinate());
      chess.delete(cp?.id);
      setSelected(undefined);
      setCurrentCamp(chess.changeCamp(selected.camp));
    }
  };

  // 处理棋子点击事件
  const handleChessPieces = (item: BaseChessPiece) => {
    if (item.camp === currentCamp) {
      selected?.onBlur();
      item.onFocus();
      item.calculatePoints();
      setSelected(item);
    }
  };

  // 渲染棋子
  const renderChess = () => {
    return chess.chessPieces.map(item => {
      const Render = item.render;
      return (
        <Render key={item.id} onSelected={() => handleChessPieces(item)} />
      );
    });
  };

  // 使用useMemo优化渲染坐标
  const renderCoordinate = useMemo(() => {
    if (!selected) {
      return null;
    }
    const coordinates =
      selected?.points.map(point => new Coordinate(point)) || [];
    return coordinates.map(item => {
      const Render = item.render;
      return (
        <Render key={item.id} onSelected={() => handleCoordinates(item)} />
      );
    });
  }, [selected]);

  return (
    <div>
      {renderChess()}
      {renderCoordinate}
    </div>
  );
}
