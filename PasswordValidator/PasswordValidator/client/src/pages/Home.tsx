import { useState } from "react";
import { Card } from "@/components/ui/card";
import PasswordInput from "@/components/PasswordInput";
import ValidationResult from "@/components/ValidationResult";
import ApiDocumentation from "@/components/ApiDocumentation";
import { Shield } from "lucide-react";

// TODO: remove mock functionality - replace with actual API call
function validatePasswordMock(senha: string) {
  const erros: string[] = [];

  if (senha.length < 8) {
    erros.push("A senha precisa ter no mínimo 8 caracteres");
  }

  if (!/[A-Z]/.test(senha)) {
    erros.push("A senha precisa ter pelo menos uma letra maiúscula");
  }

  if (!/[0-9]/.test(senha)) {
    erros.push("A senha precisa ter pelo menos um número");
  }

  if (!/[!@#$%^&*]/.test(senha)) {
    erros.push("A senha precisa ter pelo menos um caractere especial (!@#$%^&*)");
  }

  return {
    valida: erros.length === 0,
    erros: erros.length > 0 ? erros : undefined,
  };
}

export default function Home() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<{ valida: boolean; erros?: string[] } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidate = () => {
    // TODO: remove mock functionality - replace with actual API call to /validar-senha
    setIsValidating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const validationResult = validatePasswordMock(password);
      setResult(validationResult);
      setIsValidating(false);
      console.log("Validation result:", validationResult);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold" data-testid="text-title">
                Validador de Senhas
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Microsserviço para validação de senhas com regras de segurança.
              Teste a API abaixo ou consulte a documentação.
            </p>
          </div>

          {/* Main Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Testar Validação</h2>
            <div className="space-y-6">
              <PasswordInput
                value={password}
                onChange={setPassword}
                onValidate={handleValidate}
                isValidating={isValidating}
              />
              <ValidationResult result={result} />
            </div>
          </Card>

          {/* Documentation */}
          <ApiDocumentation />
        </div>
      </div>
    </div>
  );
}
