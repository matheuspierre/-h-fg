import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, RefreshCw } from "lucide-react";

export default function Home() {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery<{ piada: string }>({
    queryKey: ['/api/piada'],
    enabled: shouldFetch,
  });

  const handleGetPiada = () => {
    setShouldFetch(true);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smile className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold" data-testid="text-title">Gerador de Piadas</h1>
          <p className="text-muted-foreground text-lg">
            Microsserviço Backend - SmartSolutions Sprint
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <Button
                onClick={handleGetPiada}
                disabled={isLoading}
                size="lg"
                className="gap-2"
                data-testid="button-get-piada"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  <>
                    <Smile className="w-5 h-5" />
                    Gerar Piada Aleatória
                  </>
                )}
              </Button>
            </div>

            {data && (
              <div className="space-y-3">
                <div className="border-t pt-6">
                  <p className="text-xl text-center leading-relaxed" data-testid="text-piada">
                    {data.piada}
                  </p>
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetPiada}
                    className="gap-2"
                    data-testid="button-another-piada"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Outra piada
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p className="font-mono">GET /api/piada</p>
          <p>Endpoint retorna: {`{ "piada": "..." }`}</p>
        </div>
      </div>
    </div>
  );
}
