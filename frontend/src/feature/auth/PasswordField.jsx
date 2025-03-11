import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const PasswordField = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required
      />
      {type === "password" && (
        <div
          className="visibility-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </div>
      )}
    </div>
  );
};

export default PasswordField;
