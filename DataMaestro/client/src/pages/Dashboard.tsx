import { useState } from 'react';
import ApiEndpoint from '@/components/ApiEndpoint';
import DataTable from '@/components/DataTable';
import ThemeToggle from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { Database, Code, Zap } from 'lucide-react';

interface DataItem {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([
    //todo: remove mock functionality
    {
      id: 1,
      title: 'Exemplo de tarefa',
      description: 'Esta é uma tarefa de exemplo no banco de dados',
      status: 'pending',
      priority: 'medium',
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleCreate = async (body?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!body) {
      return { status: 400, data: { error: 'Request body é obrigatório' } };
    }

    try {
      const parsed = JSON.parse(body);
      const newItem: DataItem = {
        id: nextId,
        title: parsed.title || 'Sem título',
        description: parsed.description || '',
        status: parsed.status || 'pending',
        priority: parsed.priority || 'medium',
      };
      
      setData([...data, newItem]);
      setNextId(nextId + 1);
      
      return { status: 201, data: { success: true, data: newItem } };
    } catch (error) {
      return { status: 400, data: { error: 'JSON inválido' } };
    }
  };

  const handleGetAll = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { status: 200, data: { success: true, data, count: data.length } };
  };

  const handleGetById = async (body?: string, id?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!id) {
      return { status: 400, data: { error: 'ID é obrigatório' } };
    }

    const item = data.find(d => d.id === parseInt(id));
    
    if (!item) {
      return { status: 404, data: { error: 'Recurso não encontrado' } };
    }
    
    return { status: 200, data: { success: true, data: item } };
  };

  const handleUpdate = async (body?: string, id?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!id) {
      return { status: 400, data: { error: 'ID é obrigatório' } };
    }

    if (!body) {
      return { status: 400, data: { error: 'Request body é obrigatório' } };
    }

    const itemIndex = data.findIndex(d => d.id === parseInt(id));
    
    if (itemIndex === -1) {
      return { status: 404, data: { error: 'Recurso não encontrado' } };
    }

    try {
      const parsed = JSON.parse(body);
      const updatedItem = { ...data[itemIndex], ...parsed };
      const newData = [...data];
      newData[itemIndex] = updatedItem;
      setData(newData);
      
      return { status: 200, data: { success: true, data: updatedItem } };
    } catch (error) {
      return { status: 400, data: { error: 'JSON inválido' } };
    }
  };

  const handleDelete = async (body?: string, id?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!id) {
      return { status: 400, data: { error: 'ID é obrigatório' } };
    }

    const item = data.find(d => d.id === parseInt(id));
    
    if (!item) {
      return { status: 404, data: { error: 'Recurso não encontrado' } };
    }

    setData(data.filter(d => d.id !== parseInt(id)));
    return { status: 200, data: { success: true, message: 'Recurso deletado com sucesso' } };
  };

  const handleDeleteFromTable = (id: number) => {
    setData(data.filter(d => d.id !== id));
  };

  const handleEditFromTable = (item: DataItem) => {
    console.log('Editar item:', item);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
                <Database className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold" data-testid="text-app-title">API Master</h1>
                <p className="text-sm text-muted-foreground" data-testid="text-app-subtitle">
                  Dashboard de Testes CRUD
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4" data-testid="card-feature-endpoints">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">5 Endpoints</h3>
                  <p className="text-sm text-muted-foreground">CRUD completo</p>
                </div>
              </div>
            </Card>

            <Card className="p-4" data-testid="card-feature-http">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-emerald-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">HTTP Status</h3>
                  <p className="text-sm text-muted-foreground">Códigos corretos</p>
                </div>
              </div>
            </Card>

            <Card className="p-4" data-testid="card-feature-storage">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-blue-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">Persistência</h3>
                  <p className="text-sm text-muted-foreground">Dados em memória</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold" data-testid="text-endpoints-title">Endpoints da API</h2>
            
            <div className="space-y-3">
              <ApiEndpoint
                method="POST"
                endpoint="/api/tasks"
                description="Criar uma nova tarefa no banco de dados"
                requestBodyPlaceholder='{\n  "title": "Minha tarefa",\n  "description": "Descrição da tarefa",\n  "status": "pending",\n  "priority": "high"\n}'
                onExecute={handleCreate}
              />

              <ApiEndpoint
                method="GET"
                endpoint="/api/tasks"
                description="Listar todas as tarefas armazenadas"
                onExecute={handleGetAll}
              />

              <ApiEndpoint
                method="GET"
                endpoint="/api/tasks/:id"
                description="Buscar uma tarefa específica por ID"
                onExecute={handleGetById}
              />

              <ApiEndpoint
                method="PUT"
                endpoint="/api/tasks/:id"
                description="Atualizar uma tarefa existente"
                requestBodyPlaceholder='{\n  "title": "Tarefa atualizada",\n  "status": "completed"\n}'
                onExecute={handleUpdate}
              />

              <ApiEndpoint
                method="DELETE"
                endpoint="/api/tasks/:id"
                description="Remover uma tarefa do banco de dados"
                onExecute={handleDelete}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold" data-testid="text-database-title">Banco de Dados</h2>
            <DataTable 
              data={data} 
              onDelete={handleDeleteFromTable}
              onEdit={handleEditFromTable}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
