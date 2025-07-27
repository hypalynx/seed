import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { spawn } from "node:child_process";
import { build } from "esbuild";
import path from "node:path";

const workspace = process.cwd();

// Build configs (same as build.js)
const serverConfig = {
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  logLevel: "error",
  entryPoints: {
    server: path.join(workspace, "src", "server.js"),
  },
  outdir: path.join(workspace, "dist"),
  jsxFactory: "h",
  jsxFragment: "Fragment",
};

const clientConfig = {
  bundle: true,
  platform: "browser",
  format: "esm",
  logLevel: "error",
  entryPoints: {
    client: path.join(workspace, "src", "client.jsx"),
  },
  outdir: path.join(workspace, "dist", "static"),
  jsxFactory: "h",
  jsxFragment: "Fragment",
};

describe("Phase 1: Integration Tests", () => {
  let serverProcess;

  before(async () => {
    // Build the app first
    console.log("Building app for integration tests...");
    await Promise.all([build(serverConfig), build(clientConfig)]);

    // Start server
    serverProcess = spawn("node", ["dist/server.js"], {
      env: { ...process.env, PORT: "3001" }, // Use different port
      stdio: "pipe",
    });

    // Wait for server to start
    await new Promise((resolve) => {
      serverProcess.stdout.on("data", (data) => {
        if (data.toString().includes("listening on port")) {
          resolve();
        }
      });
    });
  });

  after(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  test("should serve health check endpoint", async () => {
    const response = await fetch("http://localhost:3001/health");
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "healthy");
    assert.ok(data.timestamp);
  });

  test("should serve app with SSR", async () => {
    const response = await fetch("http://localhost:3001/");
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.ok(html.includes("Seed App"), "Should contain app title");
    assert.ok(
      html.includes("Minimal Preact starter"),
      "Should contain app description",
    );
    assert.ok(
      html.includes('<script type="module" src="/static/client.js">'),
      "Should include client script",
    );
  });

  test("should serve client bundle", async () => {
    const response = await fetch("http://localhost:3001/static/client.js");

    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-type").includes("javascript"));
  });
});
