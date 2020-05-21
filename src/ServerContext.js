import React, { useState } from "react";

export const ServerContext = React.createContext();

export const ServerProvider = (props) => {
  const [server, setServer] = useState("http://localhost:5000");

  return (
    <ServerContext.Provider value={[server, setServer]}>
      {props.children}
    </ServerContext.Provider>
  );
};
