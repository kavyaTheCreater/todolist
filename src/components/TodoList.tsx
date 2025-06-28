import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useTodo, Todo } from '../contexts/TodoContext';
import { useToast } from '@/components/ui/use-toast';

type SortOption = 'createdAt' | 'dueDate';
type FilterOption = 'all' | 'active' | 'completed';

const TodoList: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodo();
  const { toast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle opening the form for adding a new todo
  const handleAddClick = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  // Handle opening the form for editing an existing todo
  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // Handle form submission (add or update todo)
  const handleFormSubmit = (title: string, description: string, dueDate: Date | null) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, { title, description, dueDate });
      toast({
        title: 'Task Updated',
        description: `"${title}" has been updated`,
      });
    } else {
      addTodo(title, description, dueDate);
      toast({
        title: 'Task Added',
        description: `"${title}" has been added to your list`,
      });
    }
  };

  // Handle deleting a todo with confirmation
  const handleDeleteClick = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
      deleteTodo(id);
      toast({
        title: 'Task Deleted',
        description: `"${todoToDelete.title}" has been removed`,
      });
    }
  };

  // Handle toggling todo completion status
  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      toast({
        title: todo.completed ? 'Task Marked Incomplete' : 'Task Completed',
        description: `"${todo.title}" has been updated`,
      });
    }
  };

  // Filter and sort todos based on user selection
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // Apply status filter
      if (filterBy === 'active') return !todo.completed;
      if (filterBy === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      // Apply search filter if search query exists
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === 'dueDate') {
        // Handle todos without due dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      // Default sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Button onClick={handleAddClick} size="lg" className="gap-2">
          <PlusCircle size={18} />
          Add New Task
        </Button>
        <TodoFilter
          sortBy={sortBy}
          filterBy={filterBy}
          searchQuery={searchQuery}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="space-y-3">
        {filteredAndSortedTodos.length > 0 ? (
          filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onToggleComplete={handleToggleComplete}
            />
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-500">
              {searchQuery
                ? "No tasks match your search"
                : filterBy === "all"
                ? "Your task list is empty"
                : filterBy === "active"
                ? "No active tasks"
                : "No completed tasks"}
            </p>
            {!searchQuery && filterBy === "all" && (
              <Button
                variant="link"
                onClick={handleAddClick}
                className="mt-2"
              >
                Add your first task
              </Button>
            )}
          </div>
        )}
      </div>

      <TodoForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingTodo={editingTodo}
      />
    </div>
  );
};

export default TodoList;