import { h } from 'preact';
import { useState } from 'preact/hooks';

export const DesignPreview = () => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="bg-primary text-primary min-h-screen">
      {/* Header */}
      <header className="bg-secondary border-b border-primary p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Design System Preview</h1>
          <button 
            onClick={toggleTheme}
            className="btn btn-outline"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Primary Buttons */}
            <div className="space-y-3">
              <h3 className="font-medium text-muted">Primary Variants</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="space-y-3">
              <h3 className="font-medium text-muted">Status Variants</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-destructive">Destructive</button>
              </div>
            </div>

            {/* Style Variants */}
            <div className="space-y-3">
              <h3 className="font-medium text-muted">Style Variants</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-primary" disabled>Disabled</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Simple Card</h3>
                <p className="card-description">
                  A basic card with title and description
                </p>
              </div>
              <p className="text-primary">Some card content goes here. This demonstrates how text looks within a card component.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Interactive Card</h3>
                <p className="card-description">
                  Card with actions
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-primary">This card has interactive elements.</p>
                <div className="flex gap-2">
                  <button className="btn btn-primary">Action</button>
                  <button className="btn btn-ghost">Cancel</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Status Card</h3>
                <p className="card-description">
                  Card with status badges
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="badge badge-success">Active</span>
                  <span className="badge badge-primary">Featured</span>
                </div>
                <p className="text-muted">Status indicators help communicate state.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Form Elements</h2>
          <div className="card max-w-md">
            <div className="card-header">
              <h3 className="card-title">Sample Form</h3>
              <p className="card-description">
                Form inputs and controls
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="input" 
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Message
                </label>
                <textarea 
                  className="input" 
                  rows="3" 
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn btn-outline">
                  Draft
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Badges</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-primary mb-2">Status Badges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary">Primary</span>
                <span className="badge badge-secondary">Secondary</span>
                <span className="badge badge-success">Success</span>
                <span className="badge badge-warning">Warning</span>
                <span className="badge badge-destructive">Error</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Typography</h2>
          <div className="card">
            <h1 className="text-3xl font-bold text-primary mb-2">Heading 1</h1>
            <h2 className="text-2xl font-semibold text-primary mb-2">Heading 2</h2>
            <h3 className="text-xl font-medium text-primary mb-2">Heading 3</h3>
            <p className="text-primary mb-4">
              This is regular body text. It should be easily readable with good contrast 
              against the background in both light and dark modes.
            </p>
            <p className="text-muted">
              This is muted text, used for less important information like descriptions 
              and supplementary content.
            </p>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--primary)'}}></div>
              <p className="text-sm text-muted mt-2">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--secondary)'}}></div>
              <p className="text-sm text-muted mt-2">Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--accent)'}}></div>
              <p className="text-sm text-muted mt-2">Accent</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--success)'}}></div>
              <p className="text-sm text-muted mt-2">Success</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--warning)'}}></div>
              <p className="text-sm text-muted mt-2">Warning</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 rounded-lg" style={{background: 'var(--destructive)'}}></div>
              <p className="text-sm text-muted mt-2">Destructive</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
