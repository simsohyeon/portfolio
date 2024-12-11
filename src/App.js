import React, { useState } from "react";
import ResumeView from "./main/resources/static/client/components/ResumeView";
import ResumeEdit from "./main/resources/static/client/components/ResumeEdit";

const App = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App">
      {isEditing ? (
        <ResumeEdit onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
      ) : (
        <ResumeView onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default App;
