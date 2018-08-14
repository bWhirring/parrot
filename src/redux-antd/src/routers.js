import React from 'react'

import Count from './views/Count'

export const router = [
  {
    path: '/',
    main: () => <h1>home</h1>
  }, {
    path: '/page1',
    main: () => <h1>page1</h1>
  }, {
    path: '/count',
    main: props => <Count />
  }, {
    main: () => <div> 404 </div>
  }
]
