import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

type ActiveIdContext = {
  activeID: number | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeID = useActiveID();

  return (
    <ActiveIdContext.Provider value={{ activeID }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
