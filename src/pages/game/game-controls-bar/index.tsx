import React from 'react';
import classes from './game-control-bar.module.scss';
import { useGameContext } from 'context/game-context';
import { Link } from 'react-router-dom';
import HelpIcon from 'assets/control-bar-icons/Help.svg';
import ReplayIcon from 'assets/control-bar-icons/Replay.svg';
import HowToPlayModal from 'components/how-to-play';
import { useModalContext } from 'context/modal.context';
import TopPlayers from 'components/top-players/intex';

const GameControlsBar = function () {
 const { resetGame, setIsStopWatchActive, isLostGame, isWonGame } = useGameContext();
 const isGameACtive = !isLostGame && !isWonGame;
 const { openModal } = useModalContext();
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
      <button className="text-xs" onClick={resetGame}>
       Restart
       <img src={ReplayIcon} alt="ReplayIcon" />
      </button>
      <button
       className="text-xs"
       onClick={async () => {
        openModal({
         title: 'How To Play',
         component: <HowToPlayModal />,
         onOpen: () => setIsStopWatchActive(false),
         onClose: () => isGameACtive && setIsStopWatchActive(true)
        });
       }}
      >
       How To Play
       <img src={HelpIcon} alt="HelpIcon" />
      </button>

      <button
       className="text-xs"
       onClick={async () => {
        openModal({
         title: 'Top Players',
         component: <TopPlayers />,
         onOpen: () => setIsStopWatchActive(false),
         onClose: () => isGameACtive && setIsStopWatchActive(true)
        });
       }}
      >
       Top Players
      </button>
     </div>
    </div>
   </div>
  </>
 );
};

export default GameControlsBar;
