import { CardType } from "types/card-type";
import { LevelOptionsType, UserChoiceOptions } from "types/rule-validator-type";



type ValidateLevelType = {
	level: LevelOptionsType
	cardsInGame: Record<number, CardType[]>;
	userChoice: UserChoiceOptions
};

const formattedValues: Record<string, number> = {
	'J': 11,
	'Q': 12,
	'K': 13,
	'A': 1
};

const formatCard = (card: CardType) => {
	if (["J", "Q", "K", "A"].includes(card.value.toString())) {
		card.value = formattedValues[card.value];
	}
	return card;
};

const handelLevel1 = (userChoice: UserChoiceOptions, cardsInGame: CardType[]) => {
	// we should validate the last card.
	const currentCard = cardsInGame[cardsInGame.length - 1]
	return userChoice === currentCard.color;
};

// const handelLevel2 = (payload: PayloadType) => {
// const { userChoice, cardsInGame } = payload;
// if (!cardsInGame) return false;
// const currentCard = formatCard(cardsInGame[1]);
// const nextCard = formatCard(cardsInGame[2]);
// if (userChoice === "above") {
//   return parseInt(nextCard.value, 10) > parseInt(currentCard.value, 10);
// } else if (userChoice === "bellow") {
//   return parseInt(nextCard.value, 10) < parseInt(currentCard.value, 10);
// } else {
//   return parseInt(nextCard.value, 10) === parseInt(currentCard.value, 10);
// }
// };


export function validateLevel({ level, userChoice, cardsInGame }: ValidateLevelType) {
	if (level === 1) {
		return handelLevel1(userChoice, cardsInGame[level]);
	}
	if (level === 2) {
		return true
	}
	return true
	// if (level === 2) {
	//   return handelLevel2(payload);
	// }
}
