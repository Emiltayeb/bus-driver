import * as React from 'react';

interface StopWatchContextType {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

const StopWatchContext = React.createContext<StopWatchContextType>({
  isActive: true,
  setIsActive: () => {},
  time: 0,
  setTime: () => {},
  reset: () => {}
});

const StopWatchContextProvider: React.FC = ({ children }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState(0);

  const reset = () => {
    setTime(0);
    setIsActive(true);
  };

  return (
    <StopWatchContext.Provider
      value={{
        isActive,
        setIsActive,
        time,
        setTime,
        reset
      }}
    >
      {children}
    </StopWatchContext.Provider>
  );
};

export const useStopWatchContext = () => React.useContext(StopWatchContext);

export default StopWatchContextProvider;
