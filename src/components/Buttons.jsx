import React from "react";
import "./Buttons.css";

export default props => {

    let classes = "button ";
    classes += props.operation ? "operation" : "";
    classes += props.double ? "double" : "";
    classes += props.triple ? "triple" : "";
    // classes += props.label === "0" ? "zero" : "";

  return (

    <button
      className={classes}  
      onClick={e => props.click && props.click(props.label)}    
    >
        {props.label}
    </button>
  );
};
