import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TodoFilterProps {
  sortBy: 'createdAt' | 'dueDate';
  filterBy: 'all' | 'active' | 'completed';
  searchQuery: string;
  onSortChange: (sort: 'createdAt' | 'dueDate') => void;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onSearchChange: (search: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  sortBy,
  filterBy,
  searchQuery,
  onSortChange,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-full"
        />
      </div>

      <Select
        value={filterBy}
        onValueChange={(value) => onFilterChange(value as 'all' | 'active' | 'completed')}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as 'createdAt' | 'dueDate')}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Creation Date</SelectItem>
          <SelectItem value="dueDate">Due Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TodoFilter;