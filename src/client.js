/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'whatwg-fetch';
import React from 'react';
import router from './router';

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept('./router', () => {
      console.info(123)
    });
}
