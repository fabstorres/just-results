# justresults

Minimal, type‑safe, zero‑overhead result type and helper for JavaScript and TypeScript

# What's justresults?

justresults is a tiny TypeScript/JavaScript helper that brings Go‑style error handling to any codebase with ease.  
Every function call becomes deterministic - it either succeeds with data or fails with an explicit error.

Zero exceptions. Zero catch blocks. Zero hidden defaults.

---

## 🧩 Installation

npm install @fabstack/justresults

---

## ⚙️ Basic Usage

Basic Example

```ts
import { Result } from "@fabstack/justresults";

async function createUser(name: string) {
  if (!name) {
    return Result.fail("Name is required");
  }

  const saved = await saveToDB({ name });
  if (!saved) {
    return Result.fail("Failed to save user");
  }

  return Result.ok({ id: 1, name });
}

const res = await createUser("Fabs");

if (!res.success) {
  console.error(res.error);
  return;
}

console.log("User created:", res.data);
```

Sync Example

```ts
import { Result } from "@fabstack/justresults";

const parsed = Result.try(() => JSON.parse('{"ok":true}'));

if (parsed.success) {
  console.log(parsed.data.ok); // valid JSON
} else {
  console.error(parsed.error); // invalid JSON
}
```

Async example

```ts
import { Result } from "@fabstack/justresults";

async function getUser(id: string) {
  const res = await Result.tryAsync(fetch, `/api/users/${id}`);

  if (!res.success) {
    return Result.fail(`Failed to fetch: ${res.error}`);
  }

  const data = await res.data.json();
  return Result.ok(data);
}

const user = await getUser("42");

if (user.success) {
  console.log(user.data.name);
} else {
  console.error(user.error);
}
```
