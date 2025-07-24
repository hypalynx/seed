import { h } from 'preact';

export const Index = () => {
  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="w-[45rem] bg-white p-8 rounded-lg shadow-lg text-left">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">
          🌱 Seed App
        </h1>
        
        <p class="text-gray-600 mb-6 text-center">
          Minimal Preact starter with SSR
        </p>

        <div class="flex flex-col gap-4">
          <p>
            Seed is a project that I use to illustrate how web applications can be setup in a simple way, whilst still retaining many desired features such as:
          </p>

          <ul>
            <li>SSR</li>
            <li>SSG</li>
            <li>Component-based UI design</li>
            <li>Interaction & Client side state</li>
          </ul>

          <p>
            At the same time we avoid using the following
          </p>

          <ul>
            <li>Javascript</li>
            <li>Zod, for validation at the edges of the service.</li>
            <li>Preact, for </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
