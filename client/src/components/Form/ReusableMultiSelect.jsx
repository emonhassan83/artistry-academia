import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const ReusableMultiSelect = ({ label, name, options, disabled }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            {label ? label : null}
          </p>
          <div style={{ marginTop: "5px" }}>
            <Select
              className="text-sm"
              options={options}
              value={selectedOptions}
              onChange={handleChange}
              isMulti={true}
              {...field}
              disabled={disabled}
            />
          </div>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default ReusableMultiSelect;
