import React, { useState, useEffect } from 'react';
// global libraries for golden layout
import './global';
import MyComponent from './MyComponent';

// create instance
const GoldenLayout = window.GoldenLayout;
var myLayout = new GoldenLayout({
  content: [
    {
      type: 'row',
      content: [
        {
          type: 'react-component',
          component: 'test-component',
          props: { label: 'A' },
        },
        {
          type: 'column',
          content: [
            {
              type: 'react-component',
              component: 'test-component',
              props: { label: 'B' },
            },
          ],
        },
      ],
    },
  ],
});

export class Simple extends React.Component {
  render() {
    return <div>{this.props.label}</div>;
  }
}

myLayout.registerComponent('test-component', Simple);

//Once all components are registered, call
myLayout.init();

export default Simple;
