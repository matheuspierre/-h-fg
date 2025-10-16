import DataTable from '../DataTable';

export default function DataTableExample() {
  const mockData = [
    {
      id: 1,
      title: 'Implementar autenticação',
      description: 'Adicionar sistema de login e registro',
      status: 'in_progress' as const,
      priority: 'high' as const,
    },
    {
      id: 2,
      title: 'Criar documentação da API',
      description: 'Documentar todos os endpoints REST',
      status: 'pending' as const,
      priority: 'medium' as const,
    },
    {
      id: 3,
      title: 'Testes unitários',
      description: 'Escrever testes para rotas CRUD',
      status: 'completed' as const,
      priority: 'high' as const,
    },
  ];

  return (
    <div className="p-4">
      <DataTable
        data={mockData}
        onDelete={(id) => console.log('Deletar item:', id)}
        onEdit={(item) => console.log('Editar item:', item)}
      />
    </div>
  );
}
