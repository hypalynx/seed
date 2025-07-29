import { ToggleSwitch } from '../component/ToggleSwitch'

export const DesignPreview = () => {
  return (
    <div class='max-w-container'>
      {/* header */}
      <h4 class=''>design system preview</h4>

      <main class='group-gap-8'>
        <section class='group-responsive-row'>
          <div>
            <h2>Inputs</h2>
            <p>Form elements</p>
          </div>
          <div class='group-responsive-row'>
            <ToggleSwitch />
            <input type='text' placeholder='First Name' />
          </div>
        </section>

        {/* buttons section */}
        <section class='group-responsive-row'>
          <div>
            <h2 class=''>buttons</h2>
            <p>some buttons.. yo</p>
          </div>
          <div class=''>
            {/* primary buttons */}
            <div class='group-gap-4'>
              <div class='group-row'>
                <button class='btn btn-primary'>Primary</button>
                <button class='btn btn-neutral'>neutral</button>
                <button class='btn btn-secondary'>secondary</button>
                <button class='btn btn-accent'>accent</button>
                <button class='btn btn-success'>success</button>
                <button class='btn btn-warning'>warning</button>
                <button class='btn btn-destructive'>destructive</button>
                <button class='btn btn-ghost'>ghost</button>
                <button class='btn btn-disabled' disabled>
                  disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* cards section */}
        <section>
          <h2 class=''>cards</h2>
          <div class=''>
            <div class=''>
              <div class=''>
                <h3 class=''>simple card</h3>
                <p class=''>a basic card with title and description</p>
              </div>
              <p class=''>
                some card content goes here. this demonstrates how text looks
                within a card component.
              </p>
            </div>

            <div class=''>
              <div class=''>
                <h3 class=''>interactive card</h3>
                <p class=''>card with actions</p>
              </div>
              <div class=''>
                <p class=''>this card has interactive elements.</p>
                <div class=''>
                  <button class=''>action</button>
                  <button class=''>cancel</button>
                </div>
              </div>
            </div>

            <div class=''>
              <div class=''>
                <h3 class=''>status card</h3>
                <p class=''>card with status badges</p>
              </div>
              <div class=''>
                <div class=''>
                  <span class=''>active</span>
                  <span class=''>featured</span>
                </div>
                <p class=''>status indicators help communicate state.</p>
              </div>
            </div>
          </div>
        </section>

        {/* forms section */}
        <section>
          <h2 class=''>form elements</h2>
          <div class=''>
            <div class=''>
              <h3 class=''>sample form</h3>
              <p class=''>form inputs and controls</p>
            </div>
            <form class=''>
              <div>
                <label class=''>email</label>
                <input type='email' class='' placeholder='enter your email' />
              </div>

              <div>
                <label class=''>message</label>
                <textarea
                  class=''
                  rows='3'
                  placeholder='your message...'
                ></textarea>
              </div>

              <div class=''>
                <button type='submit' class=''>
                  submit
                </button>
                <button type='button' class=''>
                  draft
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* badges section */}
        <section>
          <h2 class=''>badges</h2>
          <div class=''>
            <div>
              <h3 class=''>status badges</h3>
              <div class=''>
                <span class=''>primary</span>
                <span class=''>secondary</span>
                <span class=''>success</span>
                <span class=''>warning</span>
                <span class=''>error</span>
              </div>
            </div>
          </div>
        </section>

        {/* typography section */}
        <section>
          <h2 class=''>typography</h2>
          <div class=''>
            <h1 class=''>heading 1</h1>
            <h2 class=''>heading 2</h2>
            <h3 class=''>heading 3</h3>
            <p class=''>
              this is regular body text. it should be easily readable with good
              contrast against the background in both light and dark modes.
            </p>
            <p class=''>
              this is muted text, used for less important information like
              descriptions and supplementary content.
            </p>
          </div>
        </section>

        {/* color palette */}
        <section>
          <h2 class=''>color palette</h2>
          <div class=''>
            <div class=''>
              <div class='' style={{ background: 'var(--primary)' }}></div>
              <p class=''>primary</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--secondary)' }}></div>
              <p class=''>secondary</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--accent)' }}></div>
              <p class=''>accent</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--success)' }}></div>
              <p class=''>success</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--warning)' }}></div>
              <p class=''>warning</p>
            </div>
            <div class=''>
              <div class='' style={{ background: 'var(--destructive)' }}></div>
              <p class=''>destructive</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
