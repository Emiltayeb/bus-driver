import * as React from 'react';
import { LevelOptionsType } from "types/rule-validator-type"
interface CardContextType {
	isGameActive: boolean,
	setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>,
	level: LevelOptionsType,
	setLevel: React.Dispatch<React.SetStateAction<LevelOptionsType>>,
	resetGame: () => void
}

const GameContext = React.createContext<CardContextType>({
	isGameActive: false,
	setIsGameActive: () => { },
	level: 1,
	setLevel: () => { },
	resetGame: () => { }
})





const GameContextProvider: React.FC = ({ children }) => {

	const [isGameActive, setIsGameActive] = React.useState(false)
	const [level, setLevel] = React.useState<LevelOptionsType>(0)

	const resetGame = () => {
		setLevel(0);
	}
	return <GameContext.Provider value={{
		isGameActive: isGameActive,
		level,
		setIsGameActive,
		setLevel,
		resetGame

	}}>
		{children}
	</GameContext.Provider>
}


export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;

