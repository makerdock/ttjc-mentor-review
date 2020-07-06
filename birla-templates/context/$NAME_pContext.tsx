import React, { useState, useContext } from "react";

export interface $NAME_pState {}
const $NAME_pContext = React.createContext<$NAME_pState | null>(null);

export const $NAME_pContextProvider = props => {
  const [$NAME_s, set$NAME_p] = useState(null);

  return (
    <$NAME_pContext.Provider value={{ $NAME_s, set$NAME_p }}>
      {props.children}
    </$NAME_pContext.Provider>
  );
};

export const use$NAME_p = (): $NAME_pState => {
  const data = useContext<$NAME_pState | null>($NAME_pContext);

  if (!data) {
    throw new Error("The $NAME_p Provider is not wrapped");
  }

  return data;
};
