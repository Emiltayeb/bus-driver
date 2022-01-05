import * as React from 'react';
import { LevelOptionsType } from "types/rule-validator-type"
interface CardContextType {
	isGameActive: boolean,
	setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>,
	level: LevelOptionsType,
	setLevel: React.Dispatch<React.SetStateAction<LevelOptionsType>>,
}

const GameContext = React.createContext<CardContextType>({
	isGameActive: false,
	setIsGameActive: () => { },
	level: 1,
	setLevel: () => { }
})





const GameContextProvider: React.FC = ({ children }) => {

	const [isGameActive, setIsGameActive] = React.useState(false)
	const [level, setLevel] = React.useState<1 | 2 | 3>(1)

	return <GameContext.Provider value={{
		isGameActive: isGameActive,
		level,
		setIsGameActive,
		setLevel,

	}}>
		{children}
	</GameContext.Provider>
}


export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;

