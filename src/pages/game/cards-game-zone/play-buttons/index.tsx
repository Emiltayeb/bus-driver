import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import classes from "./play-buttons.module.css"

import React from 'react'
const PlayingButtons = function () {
	const { level } = useGameContext()
	const { drawCard } = useCardsContext()
	const buttonOptionsMap = {
		1: ["red", "black"],
		2: ["bellow", "above", "on"],
		3: ["bellow", "above", " between", "on"]
	};

	return <div>
		{/* get buttons by level. */}
		{buttonOptionsMap[level].map((buttonText) => <button type="button" key={buttonText} onClick={() => drawCard(level)}>{buttonText}</button>)}
	</div>
}

export default PlayingButtons;