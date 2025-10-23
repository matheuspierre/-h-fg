import { useState } from "react";
import PasswordInput from "../PasswordInput";

export default function PasswordInputExample() {
  const [password, setPassword] = useState("Exemplo123!");
  
  return (
    <PasswordInput
      value={password}
      onChange={setPassword}
      onValidate={() => console.log("Validate triggered")}
      isValidating={false}
    />
  );
}
