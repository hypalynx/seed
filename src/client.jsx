// src/client.jsx
import { h, hydrate } from 'preact';
import { App } from './App.jsx';

// Hydrate the pre-rendered app
hydrate(h(App), document.getElementById('app'));

console.log('🌱 Seed app hydrated!');
