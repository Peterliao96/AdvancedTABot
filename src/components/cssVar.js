'use strict';

import invariant from 'invariant';
import CSSVarConfig from './CSSVarConfig';

var cssVar = function(/*string*/ key) /*string*/ {
  invariant(CSSVarConfig[key], 'invalid css variable ' + key);

  return CSSVarConfig[key];
};

export default cssVar;
