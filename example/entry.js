import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './hello'

let color = {
  sampleColor: 'papayawhip'
}

ReactDOM.render(<Hello color={color} />, document.getElementById('container'))
