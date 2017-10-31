import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';

import errors from './errors';
import reducer from './reducer';
import padEnd from './padEnd';
import isSimplify from './isSimplify';
import config from './analyseConfig';
import subscribeValue from './subscribeValue';

export default {
  errors,
  reducer,
  connect,
  padEnd,
  reselect,
  isSimplify,
  config,
  subscribeValue,
};
