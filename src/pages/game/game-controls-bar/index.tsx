import { useCardsContext } from 'context/card-context';
import classes from "./game-control-bar.module.scss"
import React from 'react'
import { useGameContext } from 'context/game-context';
import Button from 'components/Button/Button';
const GameControlsBar = function () {

	const { cardsInDeck, setCardsInGame, creatDeck } = useCardsContext()
	const { level, resetGame } = useGameContext()

	const onResetClick = () => {
		setCardsInGame([]);
		creatDeck()
		resetGame()
	}

	React.useEffect(() => {
		if (!cardsInDeck) return
		console.log('LOST');
	}, [cardsInDeck?.length === 0])

	return <div className={classes.Root}>
		{/* control bar. show cards remaining. reset game and how to play */}
		<div className={classes.headers}>
			<p>Cards Reaming : {cardsInDeck?.length} </p>
			<p>Level : {level} / 4</p>
		</div>
		<div className={classes.buttons}>
			<Button onClick={onResetClick} >Reset Game</Button>
			<Button>How To Play</Button></div>
	</div>
}

export default GameControlsBar;