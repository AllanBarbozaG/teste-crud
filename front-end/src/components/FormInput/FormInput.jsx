import { StyledInput } from "./style";

function FormInput({ placeholder, name, callback, value }) {
  return (
    <>
      <StyledInput
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={callback}
        value={value}
      />
    </>
  );
}

export default FormInput;
