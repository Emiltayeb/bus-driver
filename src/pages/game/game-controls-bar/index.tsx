import { useCardsContext } from 'context/card-context';
import classes from "./game-control-bar.module.css"
import React from 'react'
import { useGameContext } from 'context/game-context';
const GameControlsBar = function () {

	const { cardsInDeck } = useCardsContext()
	const { level } = useGameContext()
	// ...code

	return <div className={classes.Root}>
		{/* control bar. show cards remaining. reset game and how to play */}
		<p>Cards Reaming : {cardsInDeck?.length} </p>
		<p>Level : {level} / 4</p>
		<button>Reset Game</button>
		<button>How To Play</button>
	</div>
}

export default GameControlsBar;