import { h } from "preact";
import { TechChoiceCard } from "../component/TechChoiceCard";
import {
  Blocks,
  Rabbit,
  DatabaseZap,
  RadioTower,
  ChartNoAxesColumnIncreasing,
} from "lucide-preact";

export const Index = () => {
  return (
    <div class="grid">
      <MainSection />
      <TechChoiceCard
        title="Javascript"
        icon=<Rabbit />
        link="https://www.sqlite.org/keyword_index.html"
      >
        <p>Small. Fast. Reliable.</p>
        <p>Choose any three.</p>
        <p>(Postgres also a good alternative).</p>
      </TechChoiceCard>
      <TechChoiceCard
        title="SQLite"
        icon=<DatabaseZap />
        link="https://www.sqlite.org/keyword_index.html"
      >
        <p>Small. Fast. Reliable.</p>
        <p>Choose any three.</p>
        <p>(Postgres also a good alternative).</p>
      </TechChoiceCard>
      <TechChoiceCard
        title="Preact"
        link="https://preactjs.com/guide/v10/getting-started"
      >
        description of tech choice
      </TechChoiceCard>
      <TechChoiceCard
        title="Express"
        link="https://preactjs.com/guide/v10/getting-started"
      >
        description of tech choice
      </TechChoiceCard>
      <SubSection title="Supporting libraries" />
      <TechChoiceCard title="Zod" link="https://zod.dev">
        Zod is an amazing data validation tool, use this to check data at the
        edges of your system.
      </TechChoiceCard>
      <TechChoiceCard
        title="Litestream"
        link="https://www.sqlite.org/keyword_index.html"
      >
        <p>Constant backup solution for SQLite</p>
      </TechChoiceCard>
      <TechChoiceCard
        title="μplot"
        icon=<ChartNoAxesColumnIncreasing />
        link="https://leeoniya.github.io/uPlot/demos/index.html"
      >
        Small and performant graphing library, supports streaming of data, will
        cover 99% of your needs.
      </TechChoiceCard>
      <TechChoiceCard
        title="@preact/signals"
        icon=<RadioTower />
        link="https://zustand.docs.pmnd.rs/getting-started/introduction"
      >
        Minimal state management.
      </TechChoiceCard>
      <TechChoiceCard
        title="esbuild"
        icon=<Blocks />
        link="https://esbuild.github.io/api/#overview"
      >
        Minimal build tool.
      </TechChoiceCard>
      <TechChoiceCard title="Lucide Icons" link="https://lucide.dev/icons/">
        A very comprehensive set of icons.
      </TechChoiceCard>
    </div>
  );
};

const SubSection = ({ title }) => {
  return <div class="about-subsection">{title}</div>;
};

const MainSection = () => {
  return (
    <div class="about-main">
      <p class="text-gray-600 mb-6 text-center">
        Minimal Preact starter with SSR
      </p>

      <div class="flex gap-4">
        <p>
          Stack is a project that I use to build web applications in a simple
          way, whilst still retaining many desired features such as:
        </p>

        <ul>
          <li>SSR</li>
          <li>SSG</li>
          <li>Component-based UI design</li>
          <li>Interaction & Client side state</li>
        </ul>
      </div>
    </div>
  );
};
