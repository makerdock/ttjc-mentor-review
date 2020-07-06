import React, { useState, useContext } from "react";
import firebase from "firebase";
import { firebaseApp, db, firestoreCollections } from "../utils/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export interface User {
  id: string;
}

export interface UserState {
  user: User | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
  error: any;
}

const UserContext = React.createContext<UserState | null>(null);

const UserCacheKey = "USER_CACHE";
const userCache = localStorage.getItem(UserCacheKey);
const defaultUserData = (userCache && JSON.parse(userCache)) || null;

export const UserContextProvider: React.FC = props => {
  const [activeUserId, setActiveUserId] = useState(
    defaultUserData ? defaultUserData.id : null
  );

  const [user, loading, error] = useDocumentData(
    (activeUserId && db.doc(`${firestoreCollections.USERS}/${activeUserId}`)) ||
      null
  );

  const login = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseApp.auth().useDeviceLanguage();
      const result = await firebaseApp.auth().signInWithPopup(provider);

      const user = (result.user && result.user.providerData[0]) || null;

      if (!user) {
        throw new Error("login failed");
      }

      const userCollection = db.collection(firestoreCollections.USERS);
      const alreadyExistsDocRef = await userCollection
        .where("email", "==", user.email)
        .get();

      const docRef = !alreadyExistsDocRef.empty
        ? userCollection.doc(alreadyExistsDocRef.docs[0].id)
        : userCollection.doc();

      await docRef.set(
        {
          ...user,
          id: docRef.id,
          created: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      localStorage.setItem(
        UserCacheKey,
        JSON.stringify({ ...user, id: docRef.id })
      );

      setActiveUserId(docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.clear();
      setActiveUserId(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ user: user || defaultUserData, login, logout, loading, error }}
    >
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
