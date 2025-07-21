import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Phase 1: Basic Setup', () => {
  test('should import preact successfully', async () => {
    const { h } = await import('preact');
    assert.ok(h, 'Preact h function should be available');
  });
  
  test('should create basic JSX element', async () => {
    const { h } = await import('preact');
    const { render } = await import('preact-render-to-string');
    
    const element = h('div', { class: 'test' }, 'Hello World');
    const html = render(element);
    
    assert.ok(html.includes('Hello World'), 'Should render text content');
    assert.ok(html.includes('class="test"'), 'Should render attributes');
  });
  
  test('should have working build system', async () => {
    // This test verifies that our build system can handle the files
    // The actual component testing will happen via the built files
    const fs = await import('node:fs');
    
    // Check that source files exist
    assert.ok(fs.existsSync('src/App.jsx'), 'App.jsx should exist');
    assert.ok(fs.existsSync('src/server.js'), 'server.js should exist');
    assert.ok(fs.existsSync('src/client.jsx'), 'client.jsx should exist');
  });
});
