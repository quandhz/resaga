import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';

import errors from './errors';
import reducer from './reducer';
import padEnd from './padEnd';
import isSimplify from './isSimplify';
import dispatchTo from './dispatchTo';
import analyseConfig from './analyseConfig';
import analyseNextProps from './analyseNextProps';

export default {
  errors,
  reducer,
  connect,
  padEnd,
  reselect,
  isSimplify,
  dispatchTo,
  analyseConfig,
  analyseNextProps,
};
