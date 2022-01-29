import belowICon from 'assets/buttons-icons/Bellow.svg';
import AboveIcon from 'assets/buttons-icons/Above.svg';
import InsideIcon from 'assets/buttons-icons/Inside.svg';
import OutsideIcon from 'assets/buttons-icons/Outside.svg';
import OnIcon from 'assets/buttons-icons/On.svg';
import { LevelOptions } from 'types/level-types';

interface GameDefaults {
 name: string;
 totalLevels: number;
 levelButtonsOptions: Record<number, { text: LevelOptions; icon?: string }[]>;
}

const gameDefaults: GameDefaults = {
 name: 'Bus Driver',
 totalLevels: 2,
 levelButtonsOptions: {
  0: [{ text: 'red' }, { text: 'black' }],
  1: [
   { text: 'above', icon: AboveIcon },
   { text: 'bellow', icon: belowICon },
   { text: 'on', icon: OnIcon }
  ],
  2: [
   { text: 'inside', icon: InsideIcon },
   { text: 'outside', icon: OutsideIcon },
   { text: 'on', icon: OnIcon }
  ],
  3: [{ text: 'red' }, { text: 'black' }]
 }
};

export default gameDefaults;
