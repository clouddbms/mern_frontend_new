import { useReducer } from "react";

const initialstate = {
  value: "",
  isTouched: false,
};

//Manages the state of an input field, handles action for updating the input value
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return state;
};

const useInput = (validatevalue) => {
  const [inputstate, dispatch] = useReducer(inputStateReducer, initialstate);
  const valueIsValid = validatevalue(inputstate.value);
  const hasError = !valueIsValid && inputstate.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputstate.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;
