import React from "react";

const Checkbox = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      {options.map(option => (
        <label htmlFor={name} className="check-label" key={option}>
          {label}
          <input
            type="checkbox"
            name={name}
            id={name}
            {...rest}
            className="form-control"
            value={option}
          />
        </label>
      ))}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Checkbox;
