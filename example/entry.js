import React from 'react';
import ReactDOM from 'react-dom';
import Propless from './propless';
import WithProps from './withprops';
import WithProps2 from './withprops2';

ReactDOM.render(
    (<div>
        <Propless />
        <WithProps color='papayawhip'/>
        <WithProps2 color='orchid'/>
    </div>),
  document.getElementById('container')
);
