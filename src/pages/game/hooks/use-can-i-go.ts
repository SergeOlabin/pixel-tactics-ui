import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/store';
import { PlayerContext } from '../components/Board';

export const useCanIGo = () => {
  const owner = useContext(PlayerContext);
  const playerColor = useSelector(
    (state: RootStateType) => state.game?.playerColor,
  );
  const playerColorTurn = useSelector(
    (state: RootStateType) => state.game?.turn.currentPlayer,
  );

  const canIGoMyCells =
    owner &&
    playerColor &&
    playerColorTurn &&
    owner === playerColor &&
    owner === playerColorTurn;

  const canIGoOpponentSells =
    owner && playerColor && playerColorTurn && playerColorTurn === playerColor;

  return { canIGoMyCells, canIGoOpponentSells };
};
