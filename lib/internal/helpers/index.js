import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import errors from './errors';
import reducer from './reducer';
import padEnd from './padEnd';
import config from './analyseConfig';
import isSimplify from './isSimplify';
import subscribeValue from './subscribeValue';
import selectOwnStore from './selectOwnStore';
import selectConfigValue, { selectIsLoading } from './selectConfigValue';
import getDisplayName from './getDisplayName';

export default {
  connect,
  reselect,
  errors,
  selectOwnStore,
  selectConfigValue,
  selectIsLoading,
  reducer,
  padEnd,
  isSimplify,
  config,
  subscribeValue,
  getDisplayName,
};
