import padEndShim from 'string.prototype.padend';

const cwrp = (name, props, nextProps) => {
  const propsChanged = nextProps !== props;

  const title = `==== ${name} ${propsChanged && 'props changed'} ====`;
  console.log(`\n\n${title}`);

  if (propsChanged) {
    const keys = Object.keys(nextProps);
    keys.forEach((key) => {
      if (typeof props[key] === 'undefined'
        && typeof nextProps[key] !== 'undefined') {
        console.log(`${key}:`, props[key], '=>', nextProps[key]);
        return false;
      }

      const keyChanged = nextProps[key] !== props[key];

      if (keyChanged) {
        console.log(`${key}:`, props[key], '=>', nextProps[key]);

        if (typeof nextProps[key] !== 'object') return false;

        const subKeys = Object.keys(nextProps[key]);
        subKeys.forEach((subKey) => {
          if (typeof props[key][subKey] === 'undefined'
            && typeof nextProps[key][subKey] !== 'undefined') {
            console.log('  >', `[${subKey}]:`, props[key][subKey], '=>', nextProps[key][subKey]);
            return false;
          }
          const subKeyChanged = nextProps[key][subKey] !== props[key][subKey];

          if (subKeyChanged) {
            console.log('  >', `[${subKey}]:`, props[key][subKey], '=>', nextProps[key][subKey]);
          }

          return true;
        });
      }

      return true;
    });
  }

  console.log(padEndShim('', title.length, '='), '\n');
};

export default cwrp;
