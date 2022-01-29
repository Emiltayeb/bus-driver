import React from 'react';
import { useGameContext } from 'context/game-context';
import classes from './top-players.module.scss';
import useHttps, { HttpsStatus } from 'utils/useHttp';

const TopPlayers = () => {
 const { topPlayers, getTopPlayers } = useGameContext();
 const { status } = useHttps();

 React.useEffect(() => {
  setTimeout(() => {
   getTopPlayers();
  }, 1000);
 }, []);
 console.log('gey');
 return (
  <div className={classes.Root}>
   {status === HttpsStatus.LOADING || topPlayers.length === 0 ? (
    <span>Loading...</span>
   ) : (
    <pre>{JSON.stringify(topPlayers, null, 2)} </pre>
   )}{' '}
  </div>
 );
};

export default TopPlayers;
