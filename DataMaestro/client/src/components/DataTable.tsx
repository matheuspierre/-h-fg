import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

interface DataItem {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface DataTableProps {
  data: DataItem[];
  onDelete: (id: number) => void;
  onEdit: (item: DataItem) => void;
}

const statusColors = {
  pending: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
  in_progress: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
};

const priorityColors = {
  low: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
  medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  high: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const statusLabels = {
  pending: 'Pendente',
  in_progress: 'Em Progresso',
  completed: 'Completo',
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export default function DataTable({ data, onDelete, onEdit }: DataTableProps) {
  return (
    <Card className="p-4" data-testid="card-data-table">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold" data-testid="text-table-title">Dados Armazenados</h3>
          <Badge variant="secondary" data-testid="text-data-count">
            {data.length} {data.length === 1 ? 'registro' : 'registros'}
          </Badge>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground" data-testid="text-empty-state">
            Nenhum dado armazenado. Use POST para criar registros.
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="border rounded-md p-3 hover-elevate flex items-start justify-between gap-3"
                data-testid={`row-item-${item.id}`}
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start gap-2 flex-wrap">
                    <Badge variant="outline" className="font-mono" data-testid={`badge-id-${item.id}`}>
                      ID: {item.id}
                    </Badge>
                    <Badge className={`${statusColors[item.status]} border`} data-testid={`badge-status-${item.id}`}>
                      {statusLabels[item.status]}
                    </Badge>
                    <Badge className={`${priorityColors[item.priority]} border`} data-testid={`badge-priority-${item.id}`}>
                      {priorityLabels[item.priority]}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium" data-testid={`text-title-${item.id}`}>{item.title}</h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-description-${item.id}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => onEdit(item)}
                    data-testid={`button-edit-${item.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => onDelete(item.id)}
                    data-testid={`button-delete-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
