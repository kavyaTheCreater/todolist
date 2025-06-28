import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Todo } from '../contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const { id, title, description, completed, createdAt, dueDate } = todo;
  
  return (
    <Card className={`mb-4 shadow-sm transition-all ${completed ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={completed}
              onCheckedChange={() => onToggleComplete(id)}
              className="mt-1"
            />
            <div>
              <CardTitle 
                className={`text-lg transition-all ${completed ? 'line-through text-gray-500' : ''}`}
              >
                {title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Created: {format(new Date(createdAt), 'MMM dd, yyyy')}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            {dueDate && (
              <Badge variant={new Date() > new Date(dueDate) && !completed ? "destructive" : "outline"}>
                Due: {format(new Date(dueDate), 'MMM dd, yyyy')}
              </Badge>
            )}
            <Badge variant={completed ? "success" : "secondary"}>
              {completed ? 'Completed' : 'Active'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      {description && (
        <CardContent className="py-2">
          <p className={`text-sm ${completed ? 'text-gray-500' : 'text-gray-700'}`}>
            {description}
          </p>
        </CardContent>
      )}
      <CardFooter className="pt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(todo)}
          className="text-blue-600"
        >
          <Pencil size={16} className="mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(id)}
          className="text-red-600"
        >
          <Trash2 size={16} className="mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;