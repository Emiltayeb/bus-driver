import React from 'react';
import { useGameContext } from 'context/game-context';
import classes from './top-players.module.scss';
import useHttps, { HttpsStatus } from 'utils/useHttp';
import StopWatchIcon from 'assets/config-icons/Stop-Watch.svg';
import { ReactComponent as CrownIcon } from 'assets/top-players/crown.svg';
import getTopScores from 'utils/getTopScores';

const TopPlayers = () => {
 const { topPlayers, setTopPlayers } = useGameContext();
 const { status, getJson } = useHttps();

 React.useEffect(() => {
  (async function () {
   const data = await getJson({ url: `${process.env.REACT_APP_API_ENDPOINT}` });
   const formattersLeaders = await getTopScores(data);
   setTopPlayers(formattersLeaders);
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div className={classes.Root}>
   {status === HttpsStatus.LOADING ? (
    <span>Loading...</span>
   ) : (
    <div>
     <h1 className="text-xl font-bold"> Leaders</h1>

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
        const [name] = Object.keys(player);
        const score = player[name];
        return (
         <tr key={`${name}_${score}`}>
          <td className={`text-xs  ${isWinner ? classes.WithImage : ''}`}>
           {isWinner && <CrownIcon />}
           {name}
          </td>
          <td className="text-xs ">{score}</td>
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
