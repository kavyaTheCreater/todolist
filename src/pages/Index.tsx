import React from 'react';
import TodoList from '@/components/TodoList';

export default function TodoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Task Manager</h1>
        <p className="text-gray-600 mt-2">Organize your tasks efficiently and boost your productivity</p>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-white rounded-xl shadow-sm">
        <TodoList />
      </div>
      
      <footer className="mt-auto pt-8 pb-4 text-center text-sm text-gray-500">
        <p>Task Manager © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}