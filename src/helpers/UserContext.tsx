import { createContext } from "react";
import Models from "./Models";

type User = Models['User'];

interface contextTypes{
    userContext: User | null,
    setUserContext: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<contextTypes>({} as contextTypes);