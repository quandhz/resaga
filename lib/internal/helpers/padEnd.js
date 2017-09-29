import { PAD_LENGTH, SEPARATOR_SHORT } from '../constants';

const padEnd = (string) => string.padEnd(PAD_LENGTH, SEPARATOR_SHORT);

export default padEnd;
