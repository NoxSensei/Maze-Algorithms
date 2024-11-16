import {Context, createContext, Dispatch, SetStateAction, useState} from "react";

export interface DepthFirstSearchContextData {
    isPlayClicked: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export const DepthFirstSearchContext = createContext({}) as Context<DepthFirstSearchContextData>;