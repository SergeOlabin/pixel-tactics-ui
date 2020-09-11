import React, { useContext } from 'react';
import { IBoardCard } from '../common/Types';
import { PlayerContext } from './Board';
import CardTemplate, { EmptyCardTemplate } from './CardTemplate';
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

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  const cardData = cards[card.type].leader;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  return (
    <CardTemplate>
      {{
        header: <CardHeader stats={stats} name={cardData.name}></CardHeader>,
        content: (<React.Fragment>
          <PowerDescription>
            {cardData.power.description}
          </PowerDescription>
        </React.Fragment>),
      }}
    </CardTemplate>
  );
};

export default LeaderCard;
