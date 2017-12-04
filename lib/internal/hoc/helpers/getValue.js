import { get } from 'lodash';

const getValue = (props, key, notSetValue) =>
  get(props, `${key}`, notSetValue);

export default getValue;
