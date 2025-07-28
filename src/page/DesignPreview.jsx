import { ToggleSwitch } from '../component/ToggleSwitch'

export const DesignPreview = () => {
  return (
    <div class='group-gap-8'>
      {/* Header */}
      <header class=''>
        <div class=''>
          <h1 class=''>Design System Preview</h1>
        </div>
      </header>

      <main>
        <section>
          <h2>Toggle Switch</h2>
          <div>
            <ToggleSwitch />
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 class=''>Buttons</h2>
          <div class=''>
            {/* Primary Buttons */}
            <div class='group-gap-4'>
              <h3 class=''>Primary Variants</h3>
              <div class=''>
                <button class=''>Primary</button>
                <button class=''>Secondary</button>
                <button class=''>Accent</button>
              </div>
            </div>

            {/* Status Buttons */}
            <div class=''>
              <h3 class=''>Status Variants</h3>
              <div class=''>
                <button class=''>Success</button>
                <button class=''>Warning</button>
                <button class=''>Destructive</button>
              </div>
            </div>

            {/* Style Variants */}
            <div class=''>
              <h3 class=''>Style Variants</h3>
              <div class=''>
                <button class=''>Outline</button>
                <button class=''>Ghost</button>
                <button class='' disabled>
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 class=''>Cards</h2>
          <div class=''>
            <div class=''>
              <div class=''>
                <h3 class=''>Simple Card</h3>
                <p class=''>A basic card with title and description</p>
              </div>
              <p class=''>
                Some card content goes here. This demonstrates how text looks
                within a card component.
              </p>
            </div>

            <div class=''>
              <div class=''>
                <h3 class=''>Interactive Card</h3>
                <p class=''>Card with actions</p>
              </div>
              <div class=''>
                <p class=''>This card has interactive elements.</p>
                <div class=''>
                  <button class=''>Action</button>
                  <button class=''>Cancel</button>
                </div>
              </div>
            </div>

            <div class=''>
              <div class=''>
                <h3 class=''>Status Card</h3>
                <p class=''>Card with status badges</p>
              </div>
              <div class=''>
                <div class=''>
                  <span class=''>Active</span>
                  <span class=''>Featured</span>
                </div>
                <p class=''>Status indicators help communicate state.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section>
          <h2 class=''>Form Elements</h2>
          <div class=''>
            <div class=''>
              <h3 class=''>Sample Form</h3>
              <p class=''>Form inputs and controls</p>
            </div>
            <form class=''>
              <div>
                <label class=''>Email</label>
                <input type='email' class='' placeholder='Enter your email' />
              </div>

              <div>
                <label class=''>Message</label>
                <textarea
                  class=''
                  rows='3'
                  placeholder='Your message...'
                ></textarea>
              </div>

              <div class=''>
                <button type='submit' class=''>
                  Submit
                </button>
                <button type='button' class=''>
                  Draft
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 class=''>Badges</h2>
          <div class=''>
            <div>
              <h3 class=''>Status Badges</h3>
              <div class=''>
                <span class=''>Primary</span>
                <span class=''>Secondary</span>
                <span class=''>Success</span>
                <span class=''>Warning</span>
                <span class=''>Error</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 class=''>Typography</h2>
          <div class=''>
            <h1 class=''>Heading 1</h1>
            <h2 class=''>Heading 2</h2>
            <h3 class=''>Heading 3</h3>
            <p class=''>
              This is regular body text. It should be easily readable with good
              contrast against the background in both light and dark modes.
            </p>
            <p class=''>
              This is muted text, used for less important information like
              descriptions and supplementary content.
            </p>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 class=''>Color Palette</h2>
          <div class=''>
            <div class=''>
              <div class='' style={{ background: 'var(--primary)' }}></div>
              <p class=''>Primary</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--secondary)' }}></div>
              <p class=''>Secondary</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--accent)' }}></div>
              <p class=''>Accent</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--success)' }}></div>
              <p class=''>Success</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--warning)' }}></div>
              <p class=''>Warning</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--destructive)' }}></div>
              <p class=''>Destructive</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
