import { createContext } from "react";
import getUserInfo from "../hooks/getUserInfo";

const {uid, username} = getUserInfo();

export const AuthContext = createContext({uid, username})