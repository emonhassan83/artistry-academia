import { Controller } from "react-hook-form";

const ReusableInput = ({ type, name, label, placeholder, defaultValue, setValue }) => {
  return (
    <div style={{ marginBottom: "7px" }}>
      <p style={{ marginBottom: "5px", fontSize: "14px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onBlur={(e) => setValue(name, e.target.value)}
            {...field}
            className="input input-bordered input-sm w-full"
          />
        )}
      />
    </div>
  );
};

export default ReusableInput;
