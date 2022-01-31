import { ReactComponent as belowICon } from 'assets/buttons-icons/Bellow.svg';
import { ReactComponent as AboveIcon } from 'assets/buttons-icons/Above.svg';
import { ReactComponent as InsideIcon } from 'assets/buttons-icons/Inside.svg';
import { ReactComponent as OutsideIcon } from 'assets/buttons-icons/Outside.svg';
import { ReactComponent as OnIcon } from 'assets/buttons-icons/On.svg';
import { LevelOptions } from 'types/level-types';

interface GameDefaults {
 name: string;
 totalLevels: number;
 levelButtonsOptions: Record<number, { text: LevelOptions; Icon?: any }[]>;
}

const gameDefaults: GameDefaults = {
 name: 'Bus Driver',
 totalLevels: 4,
 levelButtonsOptions: {
  0: [{ text: 'red' }, { text: 'black' }],
  1: [
   { text: 'above', Icon: AboveIcon },
   { text: 'bellow', Icon: belowICon },
   { text: 'on', Icon: OnIcon }
  ],
  2: [
   { text: 'inside', Icon: InsideIcon },
   { text: 'outside', Icon: OutsideIcon },
   { text: 'on', Icon: OnIcon }
  ],
  3: [{ text: 'red' }, { text: 'black' }]
 }
};

export default gameDefaults;
