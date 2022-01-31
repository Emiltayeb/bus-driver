import React from 'react';
import { useGameContext } from 'context/game-context';
import classes from './top-players.module.scss';
import StopWatchIcon from 'assets/config-icons/Stop-Watch.svg';
import { ReactComponent as CrownIcon } from 'assets/top-players/crown.svg';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from 'firebase-config';
import getTopPlayers from 'utils/getTopPlayers';

const TopPlayers = () => {
 const [loading, setLoading] = React.useState(true);
 const { setTopPlayers, topPlayers } = useGameContext();
 const [snapShot, setSnapshot] = React.useState<any>(null);

 React.useEffect(() => {
  const colRef = collection(db, 'players');
  const q = query(colRef, orderBy('score', 'asc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
   setSnapshot(querySnapshot);
  });
  return () => {
   unsubscribe();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 React.useEffect(() => {
  setLoading(true);
  setTopPlayers(getTopPlayers(snapShot?.docs));
  setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [snapShot]);

 return (
  <div className={classes.Root}>
   {loading || topPlayers.length === 0 ? (
    <span>Loading...</span>
   ) : (
    <div>
     <table>
      <tbody className={classes.Players}>
       <tr>
        <th className="text-xs">Name</th>

        <th className={`${classes.WithImage} text-xs`}>
         Time
         <img src={StopWatchIcon} alt="Stop Watch Icon" />
        </th>
       </tr>
       {topPlayers.map((player, index) => {
        const isWinner = index === 0;
        return (
         <tr key={`${player.id}`}>
          <td className={`text-xs  ${isWinner ? classes.WithImage : ''}`}>
           {isWinner && <CrownIcon />}
           {player.name}
          </td>
          <td className="text-xs ">{player.score}</td>
         </tr>
        );
       })}
      </tbody>
     </table>
    </div>
   )}
  </div>
 );
};

export default TopPlayers;
