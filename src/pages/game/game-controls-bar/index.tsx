import React from 'react';
import classes from './game-control-bar.module.scss';
import { useGameContext } from 'context/game-context';
import { Link } from 'react-router-dom';
import HelpIcon from 'assets/control-bar-icons/Help.svg';
import ReplayIcon from 'assets/control-bar-icons/Replay.svg';
import TopPlayersIcon from 'assets/control-bar-icons/top-players.svg';
import HowToPlayModal from 'components/how-to-play';
import { useModalContext } from 'context/modal.context';
import TopPlayers from 'components/top-players/intex';
import { StopWatchState, useStopWatchContext } from 'context/stop-watch';

const GameControlsBar = function () {
 const { resetGame, isLostGame, isWonGame } = useGameContext();
 const { setStopWatchState } = useStopWatchContext();
 const isGameACtive = !isLostGame && !isWonGame;
 const { openModal } = useModalContext();

 const onResetClick = function () {
  setStopWatchState(StopWatchState.RESET);
  resetGame();
 };
 return (
  <>
   {/* Content */}
   <div className={classes.Root}>
    <div className={classes.Container}>
     {/* logo  */}
     <Link className={classes.Logo} to="/">
      Bus Driver
     </Link>
     <div className={classes.buttons}>
      <button className="text-xs" onClick={onResetClick}>
       Restart
       <img src={ReplayIcon} alt="ReplayIcon" />
      </button>
      <button
       className="text-xs"
       onClick={async () => {
        openModal({
         title: 'How To Play',
         component: <HowToPlayModal />,
         onOpen: () => setStopWatchState(StopWatchState.PAUSED),
         onClose: () => isGameACtive && setStopWatchState(StopWatchState.ACTIVE)
        });
       }}
      >
       How To Play
       <img src={HelpIcon} alt="HelpIcon" />
      </button>

      <button
       className={`text-xs ${classes.TopPlayers}`}
       onClick={async () => {
        openModal({
         title: 'Top Players',
         component: <TopPlayers />,
         onOpen: () => setStopWatchState(StopWatchState.PAUSED),
         onClose: () => isGameACtive && setStopWatchState(StopWatchState.ACTIVE)
        });
       }}
      >
       Top Players
       <img src={TopPlayersIcon} alt="Top PLayers Icon" />
      </button>
     </div>
    </div>
   </div>
  </>
 );
};

export default GameControlsBar;
