import React from 'react';
import ReactDOM from 'react-dom';
import Propless from './propless';
import WithProps from './withprops';

ReactDOM.render(
    (<div>
        <Propless />
        <WithProps color='red'/>
    </div>),
  document.getElementById('container')
);
