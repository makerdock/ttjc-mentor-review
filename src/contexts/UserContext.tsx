import React, { useState, useContext, useEffect } from "react";
import { RootObject } from "../utils/contracts";
import { generateFinalJSON } from "../utils/githubFetcher";

export interface User {
  id: string;
}

export interface UserState {
  data: RootObject | null;
}

const UserContext = React.createContext<UserState | null>(null);

const UserCacheKey = "DATA_CACHE";
const userCache = localStorage.getItem(UserCacheKey);
const defaultUserData = (userCache && JSON.parse(userCache)) || null;

export const UserContextProvider: React.FC = (props) => {
  const [data, setData] = useState<RootObject | null>(defaultUserData || null);
  const [loading, setLoading] = useState(!defaultUserData);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: RootObject = await generateFinalJSON();
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!defaultUserData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(UserCacheKey, JSON.stringify(data));
  }, [data]);

  return (
    <UserContext.Provider value={{ data }}>
      {loading ? <Loader /> : props.children}
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

const Loader = () => {
  return (
    <div className="flex text-center justify-center items-center h-screen w-screen">
      <span className="text-xl">Loading</span>
    </div>
  );
};
