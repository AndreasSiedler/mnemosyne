import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Hub } from "@aws-amplify/core";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
}

const userContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      // perform some action to update state whenecer an azth event is detected.
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      console.log("Current authenticated user: ", amplifyUser);

      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (error) {
      // No current signed in user
      console.error(error);
      setUser(null);
    }
  }

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}

export const useUser = (): UserContextType => useContext(userContext);
