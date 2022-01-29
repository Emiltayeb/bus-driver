import React from 'react';
import { useGameContext } from 'context/game-context';
import classes from './top-players.module.scss';
import useHttps, { HttpsStatus } from 'utils/useHttp';

const TopPlayers = () => {
 //  const { topPlayers } = useGameContext();
 const { status } = useHttps();

 console.log('gey');
 return <div className={classes.Root}>{status === HttpsStatus.LOADING ? <span>Loading...</span> : <pre> </pre>}</div>;
};

export default TopPlayers;
