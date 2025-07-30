import { ToggleSwitch } from '../component/ToggleSwitch'
import { Stepper } from '../component/Stepper'
import { Accordian } from '../component/Accordian'
import { Info, TriangleAlert, CircleX, CircleCheckBig } from 'lucide-preact'

export const DesignPreview = () => {
  return (
    <div class='max-w-container'>
      {/* header */}
      <h4 class=''>design system preview</h4>

      <main class='group-gap-8'>
        <section class='group-responsive-row'>
          <div>
            <h2>Notifications</h2>
            <p>
              Use these sparing, to notify users about important information.
            </p>
          </div>
          <div class='group-col'>
            <div class='notification info-notification'>
              <Info />
              <div>These design elements are ready to use!</div>
              <p>
                We use plain CSS and often style the HTML elements directly
                where we think there won't be conflict. You can change the
                colors, borders, spacing and more with css vars!
              </p>
            </div>
            <div class='notification warning-notification'>
              <TriangleAlert />
              <div>Make sure to read the descriptions</div>
              <p>
                It's just an important to know how to use these inputs as it is
                to have them available to use as a design system.
              </p>
            </div>
            <div class='notification destructive-notification'>
              <CircleX />
              <div>Don't eat yellow snow</div>
              <p>Just.. just don't do it okay?</p>
            </div>
            <div class='notification success-notification'>
              <CircleCheckBig />
              <div>Remember to have fun!</div>
              <p>
                We use plain CSS and often style the HTML elements directly
                where we think there won't be conflict. You can change the
                colors, borders, spacing and more with css vars!
              </p>
            </div>
          </div>
        </section>
        <section class='group-responsive-row'>
          <div>
            <h2>Inputs</h2>
            <p>
              Keep these inputs close to each other to increase a users ability
              to interact with them.
            </p>
          </div>
          <div class='group-col'>
            <ToggleSwitch />
            <Stepper initialValue={3} />
            <input type='text' placeholder='First Name' />
            <input type='number' placeholder='0' />
            <input type='password' />
            <input type='checkbox' />
            <input type='radio' />
            <input type='color' value='#002288' />
            <input type='date' /> {/* 'time' and 'datetime-local' */}
            <input type='email' />
            <input type='file' />
            <input type='image' />
            <input type='month' />
            <input type='range' />
            <input type='search' />
            <input type='tel' />
          </div>
        </section>

        <section class='group-responsive-row'>
          <div>
            <h2>Accordian</h2>
            <p>
              Pretty normal way to condense large amounts of information,
              classically in FAQ sections.
            </p>
          </div>
          <div class='group-col'>
            <Accordian title='what is this?'>
              I am an accordian, you can read this text because you clicked on
              me!
            </Accordian>
            <Accordian title='what is this?'>
              I am an accordian, you can read this text because you clicked on
              me!
            </Accordian>
          </div>
        </section>

        <section class='group-responsive-row'>
          <div>
            <h2>Links</h2>
            <p>
              Link text should be explicit about where it will take the user.
            </p>
          </div>
          <div class='group-col'>
            <p>
              Oh hey, look <a href='#'>a link</a>
            </p>
          </div>
        </section>

        {/* buttons section */}
        <section class='group-responsive-row'>
          <div>
            <h2 class=''>Buttons</h2>
            <p>some buttons.. yo</p>
          </div>
          <div class='group-row'>
            <button class='btn btn-primary'>Primary</button>
            <button class='btn btn-neutral'>neutral</button>
            <button class='btn btn-outline'>outline</button>
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
        </section>

        {/* cards section */}
        <section>
          <h2 class=''>Cards</h2>
          <div class='group-row'>
            <div class='card'>
              <div class='card-header'>
                <h3 class='card-title'>simple card</h3>
                <p class=''>a basic card with title and description</p>
              </div>
              <p class='card-description'>
                some card content goes here. this demonstrates how text looks
                within a card component.
              </p>
            </div>

            <div class='card'>
              <div class='card-header'>
                <h3 class='card-title'>interactive card</h3>
                <p class=''>card with actions</p>
              </div>
              <div class='card-description'>
                <p class=''>this card has interactive elements.</p>
                <div class='gap-4'>
                  <button class='btn btn-primary'>action</button>
                  <button class='btn btn-neutral'>cancel</button>
                </div>
              </div>
            </div>

            <div class='card'>
              <div class='card-header'>
                <h3 class='card-title'>status card</h3>
                <p class=''>card with status badges</p>
              </div>
              <div class='card-description'>
                <div class='gap-2'>
                  <span class='badge badge-primary'>active</span>
                  <span class='badge badge-secondary'>featured</span>
                </div>
                <p class=''>status indicators help communicate state.</p>
              </div>
            </div>
          </div>
        </section>

        {/* forms section */}
        <section class='group-responsive-row'>
          <h2 class=''>Forms</h2>
          <div class=''>
            <p class=''>form inputs and controls</p>
            <form class='group-col'>
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
                <button type='submit' class='btn btn-primary'>
                  submit
                </button>
                <button type='button' class='btn btn-neutral'>
                  draft
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* badges section */}
        <section class='group-responsive-row'>
          <h2 class=''>Badges</h2>
          <div class=''>
            <div class='group-col'>
              <span class='badge badge-primary'>primary</span>
              <span class='badge badge-neutral'>neutral</span>
              <span class='badge badge-secondary'>secondary</span>
              <span class='badge badge-success'>success</span>
              <span class='badge badge-warning'>warning</span>
              <span class='badge badge-destructive'>destructive</span>
            </div>
          </div>
        </section>

        {/* typography section */}
        <section class='group-responsive-row'>
          <h2 class=''>Typography</h2>
          <div class='group-col'>
            <h1 class=''>heading 1</h1>
            <h2 class=''>heading 2</h2>
            <h3 class=''>heading 3</h3>
            <h4 class=''>heading 4</h4>
            <h5 class=''>heading 5</h5>
            <h6 class=''>heading 6</h6>
            <p class=''>
              this is regular body text. it should be easily readable with good
              contrast against the background in both light and dark modes.
            </p>
            <p class='text-muted'>
              this is muted text, used for less important information like
              descriptions and supplementary content.
            </p>
          </div>
        </section>

        {/* color palette */}
        <section class='group-responsive-row'>
          <h2 class=''>Color Palette</h2>
          <div class='group-col'>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--primary)' }}
              ></div>
              <p class=''>primary</p>
            </div>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--secondary)' }}
              ></div>
              <p class=''>secondary</p>
            </div>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--accent)' }}
              ></div>
              <p class=''>accent</p>
            </div>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--success)' }}
              ></div>
              <p class=''>success</p>
            </div>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--warning)' }}
              ></div>
              <p class=''>warning</p>
            </div>
            <div class=''>
              <div
                class='h-8 w-32'
                style={{ background: 'var(--destructive)' }}
              ></div>
              <p class=''>destructive</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
