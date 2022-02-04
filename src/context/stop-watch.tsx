import React from 'react';

export enum StopWatchState {
 PAUSED,
 RESET,
 ACTIVE
}
interface StopWatchContextType {
 isStopWatchActive: boolean;
 setIsStopWatchActive: React.Dispatch<React.SetStateAction<boolean>>;
 setCurrentGameTime: React.Dispatch<React.SetStateAction<number>>;
 currentGameTime: number;
 stopWatchState: StopWatchState;
 setStopWatchState: React.Dispatch<React.SetStateAction<StopWatchState>>;
}
const StopWatchContext = React.createContext<StopWatchContextType>({
 isStopWatchActive: false,
 setIsStopWatchActive: () => {},
 currentGameTime: 0,
 setCurrentGameTime: () => {},
 stopWatchState: StopWatchState.ACTIVE,
 setStopWatchState: () => {}
});

export const StopWatchContextProvider: React.FC = function ({ children }) {
 const [isStopWatchActive, setIsStopWatchActive] = React.useState(true);
 const [currentGameTime, setCurrentGameTime] = React.useState(0);
 const [stopWatchState, setStopWatchState] = React.useState(
  StopWatchState.ACTIVE
 );

 return (
  <StopWatchContext.Provider
   value={{
    isStopWatchActive,
    setIsStopWatchActive,
    setCurrentGameTime,
    currentGameTime,
    stopWatchState,
    setStopWatchState
   }}
  >
   {children}
  </StopWatchContext.Provider>
 );
};

export const useStopWatchContext = () => React.useContext(StopWatchContext);
export default StopWatchContextProvider;
