import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ValidationResultProps {
  result: {
    valida: boolean;
    erros?: string[];
  } | null;
}

export default function ValidationResult({ result }: ValidationResultProps) {
  if (!result) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">
            Digite uma senha e clique em validar para ver o resultado
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6" data-testid="card-result">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {result.valida ? (
            <>
              <CheckCircle2 className="h-6 w-6 text-chart-2" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Senha Válida</h3>
                <p className="text-sm text-muted-foreground">
                  A senha atende a todos os requisitos de segurança
                </p>
              </div>
              <Badge variant="default" className="bg-chart-2 text-white" data-testid="badge-valid">
                Válida
              </Badge>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6 text-destructive" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Senha Inválida</h3>
                <p className="text-sm text-muted-foreground">
                  A senha não atende aos requisitos abaixo
                </p>
              </div>
              <Badge variant="destructive" data-testid="badge-invalid">
                Inválida
              </Badge>
            </>
          )}
        </div>

        {result.erros && result.erros.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-sm font-medium">Erros encontrados:</p>
            <ul className="space-y-2">
              {result.erros.map((erro, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                  data-testid={`text-error-${index}`}
                >
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{erro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
