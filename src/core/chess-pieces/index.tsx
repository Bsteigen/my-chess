import { useMemo, useState } from 'react';
import chess from '../chess';
import BaseChessPiece from '@/core/chess-pieces/baseChessPiece';
import { EChessCamp } from '@/types/enum/chess';
import Coordinate from '@/core/coordinate';

export default function ChessPieces() {
  const [selected, setSelected] = useState<BaseChessPiece>();
  const [currentCamp, setCurrentCamp] = useState<EChessCamp>(EChessCamp.han);

  console.log(selected, 'selected');
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

  const handleChessPieces = (item: BaseChessPiece) => {
    if (item.camp === currentCamp) {
      selected?.onBlur();
      item.onFocus();
      item.calculatePoints();
      setSelected(item);
    }
  };
  const renderChess = () => {
    return chess.chessPieces.map(item => {
      const Render = item.render;
      return (
        <Render key={item.id} onSelected={() => handleChessPieces(item)} />
      );
    });
  };

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
