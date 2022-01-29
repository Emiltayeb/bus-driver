import React from 'react';

interface StopWatchContextType {
 isStopWatchActive: boolean;
 setIsStopWatchActive: React.Dispatch<React.SetStateAction<boolean>>;
 setCurrentGameTime: React.Dispatch<React.SetStateAction<number>>;
 currentGameTime: number;
 reset: any;
 isReset: boolean;
 setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
}
const StopWatchContext = React.createContext<StopWatchContextType>({
 isStopWatchActive: false,
 setIsStopWatchActive: () => {},
 currentGameTime: 0,
 setCurrentGameTime: () => {},
 reset: () => {},
 isReset: false,
 setIsReset: () => {}
});

export const StopWatchContextProvider: React.FC = function ({ children }) {
 const [isStopWatchActive, setIsStopWatchActive] = React.useState(false);
 const [currentGameTime, setCurrentGameTime] = React.useState(0);
 const [isReset, setIsReset] = React.useState(false);

 const reset = function () {
  setCurrentGameTime(0);
  setIsStopWatchActive(true);
  setIsReset(true);
 };
 return (
  <StopWatchContext.Provider
   value={{ isStopWatchActive, setIsStopWatchActive, setCurrentGameTime, currentGameTime, reset, isReset, setIsReset }}
  >
   {children}
  </StopWatchContext.Provider>
 );
};

export const useStopWatchContext = () => React.useContext(StopWatchContext);
export default StopWatchContextProvider;
