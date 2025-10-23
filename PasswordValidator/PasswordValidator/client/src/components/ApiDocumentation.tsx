import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ApiDocumentation() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Documentação da API</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default">POST</Badge>
            <code className="text-sm font-mono">/validar-senha</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Endpoint para validação de senhas
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Requisição</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code className="text-xs font-mono">{`{
  "senha": "SuaSenha123!"
}`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Resposta (Válida)</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code className="text-xs font-mono">{`{
  "valida": true
}`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Resposta (Inválida)</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code className="text-xs font-mono">{`{
  "valida": false,
  "erros": [
    "A senha precisa ter no mínimo 8 caracteres",
    "A senha precisa ter um número"
  ]
}`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Regras de Validação</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Mínimo de 8 caracteres</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Pelo menos 1 letra maiúscula</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Pelo menos 1 número</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Pelo menos 1 caractere especial (!@#$%^&*)</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
