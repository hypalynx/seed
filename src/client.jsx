import { h, hydrate } from 'preact';
import { Router } from 'wouter-preact';
import { App } from './App.jsx';

hydrate(
  h(Router, {}, h(App)),
  document.getElementById('app'));

console.log('🌱 Seed app hydrated!');
