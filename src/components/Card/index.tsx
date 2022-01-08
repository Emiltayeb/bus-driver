import * as React from "react";
import classes from "./Card.module.scss";
import * as CardTypes from "types/card-type";

type CardProps = {
	currentCard: CardTypes.CardType | undefined;
	stack: boolean
};
const Card = ({ currentCard, stack }: CardProps) => {


	if (!currentCard) {
		return <></>
	}
	return (
		<div

			className={`${classes.card} ${classes?.[currentCard.color]} ${stack ? classes.stack : ""} 
			${currentCard?.isFromPreviousLevel ? classes.fromPreviousLevel : ""}
			`}
			data-value={`${currentCard.value}${currentCard.suit}`}
		>
			{currentCard.suit}
		</div>
	);
};

export default Card;
