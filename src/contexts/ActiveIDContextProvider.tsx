import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

type ActiveIDContext = {
  activeID: number | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ActiveIDContext = createContext<ActiveIDContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeID = useActiveID();

  return (
    <ActiveIDContext.Provider value={{ activeID }}>
      {children}
    </ActiveIDContext.Provider>
  );
}
