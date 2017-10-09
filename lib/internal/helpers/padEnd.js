import padEndShim from 'string.prototype.padend';
import { PAD_LENGTH, SEPARATOR_SHORT } from '../constants';

const padEnd = (string) => padEndShim(string, PAD_LENGTH, SEPARATOR_SHORT);

export default padEnd;
