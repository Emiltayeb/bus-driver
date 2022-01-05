import { useGameContext } from 'context/game-context';
import React from 'react'

const OpeningScreen = function () {

	const { setIsGameActive } = useGameContext()

	return <div>
		Opening Screen

		<button onClick={() => setIsGameActive(true)}>Start Game</button>
	</div>
}

export default OpeningScreen;