### CSS constructor 💄 for React components

![beta](https://img.shields.io/badge/status-beta-yellow.svg)

--

Every React component gets an inbuilt javascript constructor for functional logic.

**Introducing the css constructor for styling!**

```js
import React from 'react';
import css from 'css-constructor';

export default class Hello extends React.Component {

    /* javascript constructor */
    constructor (props) {
        super(props);
    }

    /* css constructor */
    @css`
        font-size: 16px;
        text-align: center;
        color: {this.props.color};
        font-family: monospace;
    `

    render () {
        return <div>Styled {this.props.color} text!</div>
    }
};

// <Hello color='papayawhip'/>

```

--

**Features:**

🎀 Supports real css

🔥 use props in css

🔼 Attaches styles to the highest element in your component

🙋 Uses classes instead of inline styles

👶 Super tiny: only 1.4K gzipped

💄 Offical library emoji

--

*Coming soon*

🌀 pseudo selectors

📱 media queries support

💻 vendor prefixes

👪 nested css


--

#### Usage

1. `npm install css-constructor --save`

2. `import css from 'css-constructor'`

3. Add a `@css` block **just before** the `render` function (important)

4. Add `transform-decorators-legacy` as the first `plugin` in your `.babelrc` (already downloaded with 💄).

If you are not familiar with `babel plugins` you can follow the [detailed instructions here.](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#installation--usage)

Or, if you would prefer using 💄 without adding the babel transform for decorators, [up-vote this issue](https://github.com/siddharthkp/css-constructor/issues/1).

--

You can start using this right away. Even though 💄 is in `BETA`, the `@css` block will always look the same.

#### Beta

The implementation is still fragile, report bugs if find any. Or, bookmark with a ⭐️ and check back soon.

#### How does it work?

💄 uses [ES7 class method decorators](https://github.com/wycats/javascript-decorators) on the render function.
I'll probably write a detailed post about it.

#### Inspiration

Heavily inspired from [glamor](https://github.com/threepointone/glamor), [styled-components](https://github.com/styled-components/styled-components) and [radium](https://github.com/FormidableLabs/radium)

#### Support

If you think 💄 is useful for your project, ⭐️ this repo for my motivation 🙇🏻
