import React, { useState } from "react";

export const ServerContext = React.createContext();

export const ServerProvider = (props) => {
  const [server, setServer] = useState(
    "http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com"
  );

  return (
    <ServerContext.Provider value={[server, setServer]}>
      {props.children}
    </ServerContext.Provider>
  );
};
