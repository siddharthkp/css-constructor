![CSS constructor for React](https://raw.githubusercontent.com/siddharthkp/css-constructor/master/header.png)

&nbsp;

Every React component gets an inbuilt javascript constructor for functional logic.

**Introducing the css constructor for styling!**

&nbsp;
&nbsp;

```jsx
import React from 'react';
import css from 'css-constructor';                  // 👶 Super tiny: only 1.2K gzipped!

export default class Hello extends React.Component {

    /* javascript constructor */
    constructor (props) {
        super(props);
    }

    /* css constructor */                           
    @css`                                           // 🔒 Isolated and co-located
        font-size: 16px;                            
        text-align: center;                         // 🎀 Supports the entirety of CSS

        color: {this.props.color};                  // 🔥 Use props in css

        display: flex;                              // 💻 Built in vendor prefixing

        &:hover {                                   // 🌀 Pseudo selectors
            color: #FFF;
        }

        img {                                       // 👪 Nested css
            border-radius: 50%;
        }
        #handle {
            margin-top: 20px;
        }

        @media (max-width: 600px) {                 // 📱 Media queries support
            & {font-size: 18px;}
        }
    `

    render () {
        return (
            <div>                               // 🔼 Attaches class to the highest element
                <img src="https://github.com/siddharthkp.png"/>
                <div id="handle">@siddharthkp</div>
            </div>
        )
    }
};

// <Hello color='papayawhip'/>

```

--

**Other features**

🙋 Uses classes instead of inline styles

🔧 Editable in developer tools

👶 Super tiny: only 1.2K gzipped!

💄 Official library emoji

*Coming soon*

🌏 server side rendering

--

#### Usage

1. `npm install css-constructor --save`

2. `import css from 'css-constructor'`

3. Add a `@css` block **just before** the `render` function (important)

4. Add `transform-decorators-legacy` as the first `plugin` in your `.babelrc` (already downloaded with 💄).

If you are not familiar with `babel plugins` you can follow the [detailed instructions here.](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#installation--usage)

Or, if you would prefer using 💄 without adding the babel transform for decorators, [up-vote this issue](https://github.com/siddharthkp/css-constructor/issues/1).

--

#### How does it work?

💄 uses [ES7 class method decorators](https://github.com/wycats/javascript-decorators) on the render function.
Detailed post coming soon.

#### Inspiration

Heavily inspired from [glamor](https://github.com/threepointone/glamor), [styled-components](https://github.com/styled-components/styled-components) and [radium](https://github.com/FormidableLabs/radium)

Special thanks to [thysultan](https://twitter.com/thysultan). [stylis](https://github.com/thysultan/stylis.js) is the bomb!

#### Support

⭐️ this repo!
