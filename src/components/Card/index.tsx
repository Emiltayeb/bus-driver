import * as React from 'react';
import classes from './Card.module.scss';
import * as CardTypes from 'types/card-type';
import useMedia from 'custom-hooks/useMedia';
import { setCustomCssProperty } from 'utils/global';
import { breakPoints, cardSizes } from 'config/layout';

type CardProps = {
  currentCard?: CardTypes.CardType;
  stack: boolean;
};

const Card = ({ currentCard, stack }: CardProps) => {
  const isMobile = useMedia('max-width', breakPoints.tablet);
  React.useEffect(() => {
    setCustomCssProperty(
      '--cardHight',
      isMobile ? cardSizes.phone : cardSizes.tablet
    );
  }, [isMobile]);
  if (!currentCard) {
    return <></>;
  }
  return (
    <div
      className={`${classes.card} ${classes?.[currentCard.color]} ${
        stack ? classes.stack : ''
      } 
			${currentCard?.isFromPreviousLevel ? classes.fromPreviousLevel : ''}
			`}
      data-value={`${currentCard.value}${currentCard.suit}`}
    >
      {currentCard.suit}
    </div>
  );
};

export default Card;
