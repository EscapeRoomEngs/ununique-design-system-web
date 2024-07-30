import { TextField } from "components/Input";
import { useState } from "react";
import { Lable } from "./atom/Text";

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <div className="grid" style={{ gap: "8px" }}>
        <Lable>아이디 입력</Lable>
        <TextField {...{ value, onChange: setValue }} />
      </div>
    </div>
  );
}

export default App;
