# Shadcn UI Package

Contains all shadcn-ui components and hooks in `src/components` and `src/hooks` which are regularly updated by `sync.bash` script.

## Install

You need to have [tailwind](https://tailwindcss.com) installed and configured.

```bash
pnpm add @sane-ts/shadcn-ui tailwindcss
```

## Usage

Add these to your your tailwind css file:

```css
@import "tailwindcss";
@import "@sane-ts/shadcn-ui/index.css";
@import "@sane-ts/shadcn-ui/themes/zinc.css";
@source "../node_modules/@sane-ts/shadcn-ui/src/**/*.js";
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Import and use components

```tsx
import { Button } from "@sane-ts/shadcn-ui";
import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);
  const onClick = () => setCount((c) => c + 1);
  return <Button onClick={onClick} children={count} />;
}
```

Check out vite project [example](https://github.com/valerii15298/sane-cn-example)
