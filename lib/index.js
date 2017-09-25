import reducers from './internal/reducer';
import reducerHelpers from './utils/reducer-helpers';
import { withResaga } from './hoc/withResaga';


export sagas from './internal/sagas';
export CONFIG from './internal/config';
export const reducer = (page, customs) => reducerHelpers.wrapReducer(reducers, page, customs);


export default withResaga;
