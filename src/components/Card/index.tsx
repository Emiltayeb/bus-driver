import * as React from "react";
import classes from "./Card.module.scss";
import * as CardTypes from "types/card-type";

type CardProps = {
	currentCard: CardTypes.CardType;
	isValidAnswer?: boolean | null;
	stack: boolean
};
const Card = ({ currentCard, isValidAnswer, stack }: CardProps) => {


	return (
		<div
			className={`${classes.card} ${classes?.[currentCard.color]} ${stack ? classes.stack : ""}`}
			data-value={`${currentCard.value}${currentCard.suit}`}
		>
			{currentCard.suit}
		</div>
	);
};

export default Card;
