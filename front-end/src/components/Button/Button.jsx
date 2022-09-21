function Button({ type, text, callback }) {
  return (
    <button type={type} onClick={callback}>
      {text}
    </button>
  );
}

export default Button;
