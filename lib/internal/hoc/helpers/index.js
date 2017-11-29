import cleanUp from './cleanUp';
import dispatch from './dispatch';
import setValue from './setValue';
import getValue from './getValue';
import config from '../../helpers/analyseConfig';
import isLoading from './isLoading';
import dispatchTo from './dispatchTo';
import exportProps from './exportProps';
import exportValues from './exportValues';
import getValuesChanged from './getValuesChanged';
import analyseNextProps from './analyseNextProps';
import getValuesFromProps from './getValuesFromProps';
import componentWillReceiveProps from './componentWillReceiveProps';

export default {
  config,
  cleanUp,
  setValue,
  isLoading,
  getValue,
  dispatch,
  dispatchTo,
  exportProps,
  exportValues,
  getValuesChanged,
  analyseNextProps,
  getValuesFromProps,
  componentWillReceiveProps,
};
