import ValidationResult from "../ValidationResult";

export default function ValidationResultExample() {
  const invalidResult = {
    valida: false,
    erros: [
      "A senha precisa ter no mínimo 8 caracteres",
      "A senha precisa ter um número",
      "A senha precisa ter um caractere especial (!@#$%^&*)"
    ]
  };

  return <ValidationResult result={invalidResult} />;
}
