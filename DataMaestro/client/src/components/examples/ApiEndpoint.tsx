import ApiEndpoint from '../ApiEndpoint';

export default function ApiEndpointExample() {
  return (
    <div className="p-4 space-y-4">
      <ApiEndpoint
        method="POST"
        endpoint="/api/tasks"
        description="Criar uma nova tarefa"
        requestBodyPlaceholder='{\n  "title": "Minha tarefa",\n  "description": "Descrição da tarefa",\n  "status": "pending",\n  "priority": "high"\n}'
        onExecute={async (body) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return {
            status: 201,
            data: { 
              id: 1, 
              ...JSON.parse(body || '{}'),
              createdAt: new Date().toISOString()
            }
          };
        }}
      />
    </div>
  );
}
