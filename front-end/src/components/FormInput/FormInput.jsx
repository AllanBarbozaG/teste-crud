import { StyledInput } from "./style";

function FormInput({ type, placeholder, name, callback, value }) {
  return (
    <>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={callback}
        value={value}
      />
    </>
  );
}

export default FormInput;
