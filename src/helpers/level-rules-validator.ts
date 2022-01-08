import { CardType } from "types/card-type";
import { LevelOptionsType, UserChoiceOptions } from "types/rule-validator-type";



type ValidateLevelType = {
	level: LevelOptionsType
	cardsInGame: any;
	userChoice: UserChoiceOptions
};

// helpers
const formattedValues: Record<string, string> = {
	'J': "11",
	'Q': '12',
	'K': '13',
	'A': '14'
};

const formatCard = (card: CardType) => {
	if (["J", "Q", "K", "A"].includes(card.value.toString())) {
		return formattedValues[card.value];
	}
	return card.value;
};

// handlers
const handelLevel1 = (userChoice: UserChoiceOptions, cardsInGame: CardType[]) => {
	// we should validate the last card.
	const currentCard = cardsInGame[cardsInGame.length - 1]
	return userChoice === currentCard.color;
};

const handelLevel2 = (userChoice: UserChoiceOptions, cardsInGame: [CardType, CardType]) => {

	let [currentCard, drawnCard] = cardsInGame
	const currentCardValue = parseInt(formatCard(currentCard))
	const drawnCardValue = parseInt(formatCard(drawnCard));

	if (userChoice === "above") {
		return drawnCardValue > currentCardValue
	} else if (userChoice === "bellow") {
		return drawnCardValue < currentCardValue
	} else {
		return drawnCardValue === currentCardValue
	}
};
const handelLevel3 = (userChoice: UserChoiceOptions, cardsInGame: [CardType, CardType, CardType]) => {

	let [prevFirstCard, prevSecondCard, drawnCard] = cardsInGame
	let highestPrev, lowestPrev;

	const prevFirstCardValue = parseInt(formatCard(prevFirstCard))
	const prevSecondCardValue = parseInt(formatCard(prevSecondCard))

	const drawnCardValue = parseInt(formatCard(drawnCard))

	highestPrev = prevFirstCardValue > prevSecondCardValue ? prevFirstCardValue : prevSecondCardValue;

	lowestPrev = highestPrev === prevFirstCardValue ? prevSecondCardValue : prevFirstCardValue;


	if (userChoice === "outside") {
		return drawnCardValue > highestPrev || drawnCardValue < lowestPrev
	}
	else if (userChoice === "inside") {
		return drawnCardValue < highestPrev && drawnCardValue > lowestPrev
	}
	else {
		return drawnCardValue === prevFirstCardValue || drawnCardValue === prevSecondCardValue
	}
};


export function validateLevel({ level, userChoice, cardsInGame }: ValidateLevelType) {
	if (level === 0 || level === 3) {
		return handelLevel1(userChoice, cardsInGame[level]);
	}

	if (level === 1) {
		return handelLevel2(userChoice, cardsInGame[level]);
	}
	if (level === 2) {
		return handelLevel3(userChoice, cardsInGame[level]);
	}
	return false
}
