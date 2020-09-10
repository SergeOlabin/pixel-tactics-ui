import React, { useContext } from 'react';
import { IBoardCard } from '../common/Types';
import { PlayerContext } from './Board';
import BoardCard, { EmptyBoardCard } from './BoardCard';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { cards } from '../common/Characters';

export interface ILeaderCardProps {
  card?: IBoardCard,
}

const LeaderCard: React.FC<ILeaderCardProps> = () => {
  const player = useContext(PlayerContext);
  const card = useSelector((state: IAppState) => state.gameState.leaders?.[player]);

  if (!card) return <EmptyBoardCard></EmptyBoardCard>;

  const cardData = cards[card.type].leader;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  return (
    <BoardCard>
      {{
        header: <CardHeader stats={stats} name={cardData.name}></CardHeader>,
        content: (<React.Fragment>
          <PowerDescription>
            {cardData.power.description}
          </PowerDescription>
        </React.Fragment>),
      }}
    </BoardCard>
  );
};

export default LeaderCard;
