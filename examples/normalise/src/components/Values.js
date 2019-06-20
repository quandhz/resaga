import React from 'react';
import PropTypes from 'prop-types';
import resaga, { useValue } from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

const OLD_CONFIG = {
  value: {
    title: ({
      keyPath: ({ selected }) => ['normaliseStore', 'posts', selected, 'title'],
      getter: (c) => c,
    }),
  },
};
const CONFIG = {
  value: {
    title: ({ selected }) => ({
      keyPath: ['normaliseStore', 'posts', selected, 'title'],
      getter: (c) => c,
    }),
  },
};

export const Values = (props) => {
  const { selected } = props;

  console.log('values', selected);
  // backward  compatibilities
  // const title = useValue(OLD_CONFIG.value.title, [selected], { props });
  const title = useValue(CONFIG.value.title({ selected }), [selected]);

  console.log('title', title);

  return (
    <div>
      Title {title}
    </div>
  );
};

Values.propTypes = {
  selected: PropTypes.string,
};

Values.defaultProps = {
  selected: '',
};

export default React.memo(Values);

