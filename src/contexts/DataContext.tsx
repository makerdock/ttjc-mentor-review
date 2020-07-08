import React, { useState, useContext, useEffect } from "react";
import { RootObject } from "../utils/contracts";
import { generateFinalJSON } from "../utils/githubFetcher";

export interface Data {
  id: string;
}

export interface DataState {
  data: RootObject | null;
}

const DataContext = React.createContext<DataState | null>(null);

const DataCacheKey = "DATA_CACHE";
const dataCache = localStorage.getItem(DataCacheKey);
const defaultDataData = (dataCache && JSON.parse(dataCache)) || null;

export const DataContextProvider: React.FC = (props) => {
  const [data, setData] = useState<RootObject>(defaultDataData || null);
  const [loading, setLoading] = useState(!defaultDataData);

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
    if (!defaultDataData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DataCacheKey, JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data }}>
      {loading ? <Loader /> : props.children}
    </DataContext.Provider>
  );
};

export const useData = (): DataState => {
  const dataState = useContext<DataState | null>(DataContext);

  if (!dataState) {
    throw new Error("The Provider is not present");
  }

  return dataState;
};

const Loader = () => {
  document.documentElement.style.setProperty("--background", "#434190");
  return (
    <React.Fragment>
      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="loader-text">Loading...</h1>
    </React.Fragment>

    // <div className="flex text-center justify-center items-center h-screen w-screen">
    //   <span className="text-xl">Loading</span>
    // </div>
  );
};
