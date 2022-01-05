import React from 'react'
import { useCardsContext } from 'context/card-context'
import CardsGameZone from './cards-game-zone'
import GameControlsBar from './game-controls-bar'

const GameScreen = function () {
	const { creatDeck } = useCardsContext()

	//  on first mount - means game is started. make a new deck
	React.useEffect(() => {
		creatDeck()
	}, [])

	return <div>
		<GameControlsBar />
		{/* cards level platform.*/}
		<CardsGameZone />
	</div>
}

export default GameScreen;