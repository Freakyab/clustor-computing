"use client";
import React, { Children, ReactNode } from "react";

// export const UserContext = React.createContext<{
//     user : User | null ,
//     setUser : (User) = {}
// }>{
//     user : {
//         name : "",
//         email : "",
//         password : "",
//         id : "",
//     }
// }

export const UserContext = React.createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};


export const UseUser = () => React.useContext(UserContext);