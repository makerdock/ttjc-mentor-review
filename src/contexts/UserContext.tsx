import React, { useState, useContext } from "react";
import firebase from "firebase";
import { firestoreCollections } from "../utils/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export interface User {
  id: string;
}

export interface UserState {
  users: User[] | null;
}

const UserContext = React.createContext<UserState | null>(null);

const UserCacheKey = "USER_CACHE";
const userCache = localStorage.getItem(UserCacheKey);
const defaultUserData = (userCache && JSON.parse(userCache)) || null;

export const UserContextProvider: React.FC = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <UserContext.Provider value={{ users }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserState => {
  const userState = useContext<UserState | null>(UserContext);

  if (!userState) {
    throw new Error("The Provider is not present");
  }

  return userState;
};
