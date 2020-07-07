import React from "react";
import { DataContextProvider } from "./DataContext";

// add your context from parent to child level here
const contexts = [DataContextProvider].reverse();

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
