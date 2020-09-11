import React, { useContext } from 'react';
import { Waves, Positions } from '../common/Types';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
import { EmptyCardTemplate } from './CardTemplate';

interface Place {
  wave: Waves,
  position: Positions,
}

export interface IBoardCardProps {
  place: Place,
}

const BoardCard: React.FC<IBoardCardProps> = (props) => {
  const { place } = props;
  const player = useContext(PlayerContext);
  const card = useSelector((state: IAppState) =>
    state.gameState.board[player][place.wave][place.position]);

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  return (<HeroCard card={card}></HeroCard>);
};

export default BoardCard;
