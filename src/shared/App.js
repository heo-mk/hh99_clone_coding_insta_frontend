import React from 'react';
import { ConnectedRouter } from "connected-react-router";

function App() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ConnectedRouter>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
