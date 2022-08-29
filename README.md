# react-emitter-factory  ![npm](https://img.shields.io/npm/v/react-emitter-factory)
An easy solution for creating custom refs for custom functional React components, kinda.

```sh
npm i react-emitter-factory
```

```sh
yarn add react-emitter-factory
```

```sh
pnpm add react-emitter-factory
```

Note that akin to this package's `react-` prefix, it has a `peerDependency` listing for `react`.

## The why
Apparently, at the time of this package development, [functional React components do not support the creation of refs](https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components). We are forced to only use native element's or class component's refs with [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref), pass them along with [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html), or manipulate them with [`useImperativeHandle`](https://reactjs.org/docs/hooks-reference.html#useimperativehandle).

Despite this limitation, there are actual times where we need the capability of using APIs exposed by our own custom components, e.g., `scrollToTop()` on our custom `TabNavigation`, or `dismiss()` or `present()` on our custom `SheetModal`, while _keeping our components functional_, because it is cool.

This package will help you achieve these goals, albeit not simulating a **true** custom ref, since under the hood it uses `useEffect`, and therefore the emitted values may change between render cycles. However, if you are only exposing functions (like the use cases above), they should be fine. If you are exposing values, just keep this factor in mind, test, and see. Most of the time it should work wonders.

## How to use
>An `Emitter` is a construct that defines what your component wishes to expose. An emitter factory is the hook you use in said component to initialise (bind, or define) the `Emitter` after its render.

### In your emitting component, e.g., `TabNavigation.tsx`
```tsx
import useEmitterFactory, { Emits } from 'react-emitter-factory';

export type TabNavigator = {    // <- example of an Emitter
  nextTab: () => void;
  previousTab: () => void;
};

interface TabNavigationProps extends Emits<TabNavigator> {  // <- register it here!
  ...
}

const TabNavigation = (props: TabNavigationProps): JSX.Element => {  
  useEmitterFactory(props, {    // <- define it here!
    nextTab: () => {
      // define your logic here!
    },
    previousTab: () => {
      // define your logic here!
    },
  });
  
  ...
};
```

### In your client, e.g., `HomeScreen.tsx`
```tsx
import { useState } from 'react';

import TabNavigation, { TabNavigator } from './TabNavigator';

const HomeScreen = (): JSX.Element => {
  const [tabNavigator, setTabNavigator] = useState<TabNavigator>();
  
  return (
    <TabNavigation emitsVia={setTabNavigator} ...>   // <- bind the emitter here!
      <Button onClick={tabNavigator.nextTab}>        // <- use the emitted functions here!
        Next tab
      </Button>
    </TabNavigation>
  );
};
```

## Additional notes
### Adding dependencies
`useEmitterFactory` supports adding dependencies such that if any of the given dependencies change in value, the emitter factory will run again and 'refresh' the emitter.

```tsx
const TabNavigation = (props: TabNavigationProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLocation, setScrollLocation] = useState(0);
  
  useEmitterFactory(props, {
    nextTab: () => { ... },
    previousTab: () => { ... },
    isLoading,
    scrollLocation,
  }, [isLoading, scrollLocation]);   // <- add the dependencies here
  
  ...
};
```

After the emitter factory 'refreshes', if the client `useState` to keep track of the emitter, then the client will also re-render. If no dependencies were given, e.g., in the previous example, or `[]`, the emitter will only run once after each render.

### About the props
You might have already noticed this, but extending `Emits` adds the `emitsVia?` props to your emitting component. This is a __function__. Note that refs allow direct assignment, e.g., `<div ref={ref} ...>`, but this is not the case here.

### Examples and snippet docs are available in your IDE in TSDocs.

## Contributing 
Wow, thanks!
```sh
git clone https://github.com/purfectliterature/react-emitter-factory.git
cd react-emitter-factory
npm i
```
and _git_ going! (geddit?)

You might want to install [Prettier](https://prettier.io/docs/en/install.html) too. I have configured it for you <3

When developing, you might want to
```sh
npm run build
```
to build the package to `dist/`, then use [`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link) or [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link) to test your build on an existing client project.

When you are ready, open a pull request, and I will attend to you soon!
