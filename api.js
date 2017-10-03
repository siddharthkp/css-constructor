import React from 'react'
import stylis from 'stylis'

/*
    This get's used as decorator @css

    Get's the template literal passed to it argument.
    This contains references to props as well

    Method decorators expect a function to be returned,
    this function gets the parent class, name of the function -
    render in this case and the descriptor for the function.
*/

let css = rawCSS => (parentClass, name, descriptor) => ({
  ...descriptor,
  value: function() {
    let
      originalProps,
      getProps = object => {   /* Totally stealing props by fake rendering the component */
        originalProps = object.props
        return object
      },
      rendered = descriptor.value.apply(getProps(this), arguments),
      realCSS = fillProps(rawCSS, originalProps)     /* Replace props and return realCSS™ */

    /* Merge classNames */
    const existingClassNames = rendered.props.className || ''
    let className = `${existingClassNames} ${insertRules(realCSS)}`

    /* Convert real CSS to javascripty CSS */
    // let style = parseCss(realCSS);

    /* Merge styles into original props */
    let newProps = { ...originalProps, className }

    /*
            Pass on a clone of the rendered component
            with our merged props.
            This overrides the original render function
        */
    return React.cloneElement(rendered, newProps, rendered.props.children)
  }
})

/*
    Replace props with actual values

    Uses regex pattern to match references to props

    Supports direct usage
    color: {this.props.color}

    Does not evaluate conditions (yet)
    color: {this.props.color || 'blue'}
*/

let fillProps = (rawCSS, props) => {
  rawCSS = rawCSS[0] // template literal = array
  let
    re = /{this.props.*}/g,
    matches = rawCSS.match(re)
  if (matches && matches.length) {
    for (let match of matches) {
      let
        keyword = match,
        replaceWord,
        propKeys
      keyword = keyword.replace('{this.props.', '')
      keyword = keyword.substring(0, keyword.length - 1) // remove }
      keyword = keyword.trim()
      replaceWord = props
      propKeys = keyword.split('.')
      for (let i = 0; i < propKeys.length; i++) {
        replaceWord = replaceWord[propKeys[i]]
      }
      rawCSS = rawCSS.replace(match, replaceWord)
    }
  }
  return rawCSS
}

/*
    Add insert rules in to css-constructor stylesheet
*/

let insertRules = realCSS => {
  let
    style = getStyleElement(),     /* Get unique classname */
    className = getHash(realCSS),  /* Convert nested CSS */
    styles = stylis(`.${className}`, realCSS)
  style.innerHTML += styles
  return className
}

let getHash = string => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    let ch = string.charCodeAt(i)
    hash = (hash << 5) - hash + ch
  }
  /* CSS classnames should begin with an alphabet */
  return 'c' + hash.toString(36)
}

let getStyleElement = () => {
  let styleElement = document.querySelector('[title=css-constructor]')
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.setAttribute('title', 'css-constructor')
    document.head.appendChild(styleElement)
  }
  return styleElement
}

let camelCase = key =>
  key.replace(/(\-[a-z])/g, $1 => $1.toUpperCase().replace('-', ''))

module.exports = css
