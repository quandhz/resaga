import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import errors from './errors';
import reducer from './reducer';
import padEnd from './padEnd';
import config from './analyseConfig';
import isSimplify from './isSimplify';
import subscribeValue from './subscribeValue';

export default {
  connect,
  reselect,
  errors,
  reducer,
  padEnd,
  isSimplify,
  config,
  subscribeValue,
};
