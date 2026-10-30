import { Controller } from "react-hook-form";

const ReusableSelect = ({ label, name, options, disabled }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            {label ? label : null}
          </p>
          <select
            className="select select-bordered font-normal w-full select-sm"
            {...field}
            disabled={disabled}
          >
            {options &&
              options.map((item) => <option className="font-normal" key={item.key}>{item.data}</option>)}
          </select>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default ReusableSelect;
