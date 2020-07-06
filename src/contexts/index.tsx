import React from "react";
import { UserContextProvider } from "./UserContext";

// add your context from parent to child level here
const contexts = [UserContextProvider].reverse();

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <>
      {contexts.reduce(
        (childComponent, Provider) => (
          <Provider>{childComponent}</Provider>
        ),
        children
      )}
    </>
  );
};
