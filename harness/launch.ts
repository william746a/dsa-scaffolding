/**
 * Loads one gate module on the runner's behalf. A gate that cannot even load —
 * a locked rung, a syntax error in the scaffold, a missing export on a blank
 * page — is reported as the message and the offending line, not as a trace
 * through node's module loader.
 */

import { pathToFileURL } from "node:url";
import { cleanStack } from "./trace.ts";

const [, , file] = process.argv;
if (!file) {
  console.error("usage: node harness/launch.ts <rung-N.test.ts>");
  process.exit(2);
}

try {
  await import(pathToFileURL(file).href);
} catch (err) {
  console.error(cleanStack(err));
  process.exitCode = 1;
}
