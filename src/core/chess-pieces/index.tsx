'use client';
import { useCallback, useMemo } from 'react';
import BaseChessPiece from '@/core/chess-pieces/baseChessPiece';
import Coordinate from '@/core/coordinate';
import Render from './render';
import { useRequest, useUpdateEffect } from 'ahooks';
import axios from 'axios';
import type { TChessPieces } from '../chess/init';
import { EChessCamp } from '@/types/enum/chess';

// 棋子组件，用于展示棋盘上的棋子及其行为
export default function ChessPieces() {
  // 当前行动的阵营

  const { data: chessPieces, refresh: refreshChessPieces } = useRequest(() =>
    axios.get<TChessPieces>('/api/data').then(res => res.data),
  );

  const { data: currentCamp, refresh: refreshCamp } = useRequest(
    () => axios.get<EChessCamp>('/api/data/camp').then(res => res.data),
    { pollingInterval: 1000 },
  );

  const selected = useMemo(
    () => chessPieces?.filter(item => item.checked)[0],
    [chessPieces],
  );

  const refresh = useCallback(() => {
    refreshCamp();
    refreshChessPieces();
  }, [refreshCamp, refreshChessPieces]);

  useUpdateEffect(() => refreshChessPieces(), [currentCamp]);

  console.log(selected, 'selected');

  // 处理坐标点击事件
  const handleCoordinates = useCallback(
    async (item: Coordinate) => {
      if (!selected) {
        return;
      }
      if (selected.camp === currentCamp) {
        await axios.put('/api/action/move', {
          currentId: selected.id,
          target: item.getCoordinate(),
        });
        refresh();
      }
    },
    [selected, currentCamp, refresh],
  );

  // 处理棋子点击事件
  const handleChessPieces = async (item: BaseChessPiece) => {
    if (item.camp === currentCamp) {
      await axios.put<BaseChessPiece>('/api/action/selected', item.id);
      refresh();
    }
  };

  // 渲染棋子
  const renderChess = () => {
    if (!chessPieces) return null;
    return chessPieces.map(item => {
      return (
        <Render
          key={item.id}
          {...item}
          onSelected={() => handleChessPieces(item)}
        />
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
      return (
        <Render
          key={item.id}
          {...item}
          onSelected={() => handleCoordinates(item)}
        />
      );
    });
  }, [handleCoordinates, selected]);

  return (
    <div>
      {renderChess()}
      {renderCoordinate}
    </div>
  );
}
