import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  requestBodyPlaceholder?: string;
  onExecute: (body?: string, id?: string) => Promise<{ status: number; data: any }>;
}

const methodColors = {
  GET: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  POST: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  PUT: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  DELETE: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

export default function ApiEndpoint({ method, endpoint, description, requestBodyPlaceholder, onExecute }: ApiEndpointProps) {
  const [requestBody, setRequestBody] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [response, setResponse] = useState<{ status: number; data: any } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      const result = await onExecute(requestBody, resourceId);
      setResponse(result);
    } catch (error) {
      setResponse({ status: 500, data: { error: 'Request failed' } });
    } finally {
      setIsLoading(false);
    }
  };

  const needsId = endpoint.includes(':id');
  const needsBody = method === 'POST' || method === 'PUT';

  return (
    <Card className="p-4 hover-elevate" data-testid={`card-endpoint-${method.toLowerCase()}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${methodColors[method]} border font-mono font-semibold`} data-testid={`badge-method-${method.toLowerCase()}`}>
                {method}
              </Badge>
              <code className="text-sm font-mono text-muted-foreground" data-testid={`text-endpoint-${method.toLowerCase()}`}>
                {endpoint}
              </code>
            </div>
            <p className="text-sm text-muted-foreground" data-testid={`text-description-${method.toLowerCase()}`}>
              {description}
            </p>
          </div>
          <Button 
            size="sm" 
            onClick={handleExecute} 
            disabled={isLoading}
            data-testid={`button-execute-${method.toLowerCase()}`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Executar
          </Button>
        </div>

        {needsId && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">ID do Recurso</label>
            <Input
              placeholder="Digite o ID (ex: 1, 2, 3...)"
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              className="font-mono"
              data-testid={`input-id-${method.toLowerCase()}`}
            />
          </div>
        )}

        {needsBody && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">Request Body (JSON)</label>
            <Textarea
              placeholder={requestBodyPlaceholder || '{\n  "campo": "valor"\n}'}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="font-mono text-sm min-h-24"
              data-testid={`input-body-${method.toLowerCase()}`}
            />
          </div>
        )}

        {response && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Resposta:</span>
              <Badge 
                variant={response.status < 300 ? 'default' : 'destructive'}
                className="font-mono"
                data-testid={`badge-status-${method.toLowerCase()}`}
              >
                {response.status}
              </Badge>
            </div>
            <pre 
              className="bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto"
              data-testid={`text-response-${method.toLowerCase()}`}
            >
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}
