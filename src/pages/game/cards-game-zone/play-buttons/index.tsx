import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import classes from "./play-buttons.module.scss"

import React from 'react'
import { validateLevel } from 'helpers/level-rules-validator';
import { UserChoiceOptions } from "types/rule-validator-type"
import Button from 'components/Button/Button';


const buttonOptionsMap: { [key: number]: Partial<UserChoiceOptions>[] } = {
	1: ["red", "black"],
	2: ["bellow", "above", "on"],
	3: ["bellow", "above", "between", "on"]
};


const PlayingButtons = function () {

	const [userChoice, setUserChoice] = React.useState<UserChoiceOptions | null>(null)
	const { level } = useGameContext()
	const { drawCard, currentCard, cardsInGame } = useCardsContext()


	React.useEffect(() => {
		if (!currentCard || !userChoice || !cardsInGame) return;
		// validate user choice
		const choiceStatus = validateLevel({ level, userChoice, cardsInGame })
	}, [currentCard])


	const onPlayButtonClick = (buttonText: UserChoiceOptions) => () => {
		drawCard(level);
		setUserChoice(buttonText)
	}

	return <div className={classes.Root}>
		{/* get buttons by level. */}
		{buttonOptionsMap[level].map((buttonText) =>
			<Button data-variant={buttonText} type="button" key={buttonText}
				onClick={onPlayButtonClick(buttonText)}>{buttonText}</Button>)}


	</div>
}

export default PlayingButtons;