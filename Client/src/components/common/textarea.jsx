import React from "react";

const TextArea = ({ name, label, placeholder, ids, error, ...rest }) => {
  
  return (
    <div className="form-group">
{ (label) && <label htmlFor={ids}>{label}</label> }
      <textarea {...rest} name={name} placeholder={placeholder} id={ids} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
