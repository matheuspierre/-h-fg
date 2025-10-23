import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: () => void;
  isValidating: boolean;
}

export default function PasswordInput({
  value,
  onChange,
  onValidate,
  isValidating,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onValidate();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-base font-medium">
          Senha
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite a senha para validar"
            className="pr-10 font-mono"
            data-testid="input-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
            data-testid="button-toggle-visibility"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {value.length} caracteres
        </p>
      </div>

      <Button
        onClick={onValidate}
        disabled={!value || isValidating}
        className="w-full"
        data-testid="button-validate"
      >
        {isValidating ? "Validando..." : "Validar Senha"}
      </Button>
    </div>
  );
}
