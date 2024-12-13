import React, { useState } from "react";
import PortfolioView from "./main/resources/static/client/components/PortfolioView";
import PortfolioEdit from "./main/resources/static/client/components/PortfolioEdit";

const App = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App">
      {isEditing ? (
        <PortfolioEdit onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
      ) : (
        <PortfolioView onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default App;
