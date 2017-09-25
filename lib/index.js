import reducers from './internal/reducer';
import helpers from './utils/reducer-helpers';
import withResaga from './hoc/withResaga';

export CONFIG from './internal/config';
export sagas from './internal/sagas';
export const reducer = (name, customs) => helpers.wrapReducer(reducers, name, customs);

export default withResaga;
