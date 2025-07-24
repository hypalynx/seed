import { h } from 'preact';
import { useState } from 'preact/hooks';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          🌱 Seed App
        </h1>
        
        <p class="text-gray-600 mb-6">
          Minimal Preact starter with SSR
        </p>
        
        <div class="flex items-center justify-center space-x-4">
          <button 
            onClick={() => setCount(count - 1)}
            class="text-2xl font-bold px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          
          <span class="w-8 text-2xl font-semibold text-gray-800">
            {count}
          </span>
          
          <button 
            onClick={() => setCount(count + 1)}
            class="text-2xl font-bold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
        
        <p class="text-sm text-gray-500 mt-4">
          Click the buttons to test client-side hydration!
        </p>
      </div>
    </div>
  );
}
