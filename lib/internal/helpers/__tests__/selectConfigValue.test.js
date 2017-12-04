/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import selectConfigValue, { isGetter } from '../selectConfigValue';


const initState = fromJS({ TemplateStore: { templates: {}, id: 1 } });

const setKeyValue = (key, value) => {
  const templates = initState.getIn(['TemplateStore']);
  return initState.mergeIn(['TemplateStore'], templates.concat({ [key]: value }));
};


describe('selectConfigValue()', () => {
  const state = setKeyValue('templates', { 1: { content: 'hi ho', other: true } });

  it('should exists', () => {
    expect(selectConfigValue);
  });

  it('should use default value', () => {
    expect(selectConfigValue()()).toEqual({});
  });


  describe('function', () => {
    it('value is set', () => {
      const configs = { title: ({ id }) => ['TemplateStore', 'templates', id, 'content'] };

      expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: 'hi ho' });
    });

    it('value is undefined', () => {
      const configs = { title: ({ id }) => ['TemplateStore', 'templates', id, 'content'] };

      expect(selectConfigValue(configs)(state, { id: 2 })).toEqual({ title: undefined });
      expect(selectConfigValue(configs)(state, {})).toEqual({ title: undefined });
    });

    it('keyPath is undefined', () => {
      const configs = { title: ({ id }) => ['TemplateStore', 'template', id, 'content'] };

      expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: undefined });
    });
  });


  describe('array of strings', () => {
    it('keyPath exists', () => {
      const configs = { templates: ['TemplateStore', 'templates'] };
      expect(selectConfigValue(configs)(state)).toEqual({ templates: { 1: { content: 'hi ho', other: true } } });
    });

    it('keyPath undefined', () => {
      const configs = { templates: ['TemplateStore', 'template'] };
      expect(selectConfigValue(configs)(state)).toEqual({ template: undefined });
    });

    it('name undefined', () => {
      const configs = { templates: ['TemplatesStore', 'template'] };
      expect(selectConfigValue(configs)(state)).toEqual({ template: undefined });
    });
  });


  describe('array, last element is function', () => {
    it('one keyPath, value is set', () => {
      const configs = {
        title: [
          ({ id }) => ['TemplateStore', 'templates', id, 'content'],
          (title, { surfix }) => `${title}_${surfix}`,
        ],
      };
      expect(selectConfigValue(configs)(state, { id: 1, surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe' });
    });

    it('2 keyPaths, value is set', () => {
      const configs = {
        title: [
          ['TemplateStore', 'templates'],
          ['TemplateStore', 'id'],
          (templates, id, { surfix }) => `${templates[id].content}_${surfix}`,
        ],
      };
      expect(selectConfigValue(configs)(state, { surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe' });
    });

    it('5 keyPaths, value is set', () => {
      const configs = {
        title: [
          ['TemplateStore', 'templates'],
          ['TemplateStore', 'id'],
          ['TemplateStore', 'id'],
          ['TemplateStore', 'id'],
          ['TemplateStore', 'id'],
          ['TemplateStore', 'id'],
          (templates, id1, id2, id3, id4, id5, { surfix }) => `${templates[id1].content}_${surfix}_${id2}_${id3}_${id4}_${id5}`,
        ],
      };
      expect(selectConfigValue(configs)(state, { surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe_1_1_1_1' });
    });

    it('value not set', () => {
      const ownState = setKeyValue('id', 2);
      const configs = {
        title: [
          ['TemplateStore', 'templates'],
          ['TemplateStore', 'id'],
          (templates, id) => templates[id] && `${templates[id].content}`,
        ],
      };
      expect(selectConfigValue(configs)(ownState, {})).toEqual({ title: undefined });
    });
  });


  describe('object', () => {
    describe('keyPath', () => {
      describe('keyPath is function', () => {
        it('value is set', () => {
          const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id, 'content'] } };
          expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: 'hi ho' });
        });

        it('value is undefined', () => {
          const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id, 'content'] } };
          expect(selectConfigValue(configs)(state, { id: 2 })).toEqual({ title: undefined });
          expect(selectConfigValue(configs)(state, {})).toEqual({ title: undefined });
        });

        it('value is undefined, notSetValue is set', () => {
          const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id, 'content'], notSetValue: 'titleNotSet' } };
          expect(selectConfigValue(configs)(state, { id: 2 })).toEqual({ title: 'titleNotSet' });
          expect(selectConfigValue(configs)(state, {})).toEqual({ title: 'titleNotSet' });
        });

        it('keyPath is undefined', () => {
          const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'template', id, 'content'] } };
          expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: undefined });
        });

        it('keyPath is undefined, notSetValue is set', () => {
          const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'template', id, 'content'], notSetValue: 'titleNotSet' } };
          expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: 'titleNotSet' });
        });
      });

      describe('keyPath is array of strings', () => {
        it('keyPath exists', () => {
          const configs = { templates: { keyPath: ['TemplateStore', 'templates'] } };
          expect(selectConfigValue(configs)(state)).toEqual({ templates: { 1: { content: 'hi ho', other: true } } });
        });

        it('keyPath undefined', () => {
          const configs = { templates: { keyPath: ['TemplateStore', 'template'] } };
          expect(selectConfigValue(configs)(state)).toEqual({ templates: undefined });
        });

        it('keyPath undefined, notSetValue is set', () => {
          const configs = { templates: { keyPath: ['TemplateStore', 'template'], notSetValue: {} } };
          expect(selectConfigValue(configs)(state)).toEqual({ templates: {} });
        });
      });

      describe('keyPath is array of strings and functions', () => {
        it('one keyPath, value is set', () => {
          const configs = {
            title: {
              keyPath: [
                ({ id }) => ['TemplateStore', 'templates', id, 'content'],
              ],
              getter: (title, { surfix }) => `${title}_${surfix}`,
            },
          };
          expect(selectConfigValue(configs)(state, { id: 1, surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe' });
        });

        it('one keyPath, value is set, no getter', () => {
          const configs = {
            title: {
              keyPath: [({ id }) => ['TemplateStore', 'templates', id, 'content']],
            },
          };
          expect(selectConfigValue(configs)(state, { id: 1, surfix: 'hehe' })).toEqual({ title: 'hi ho' });
        });

        it('2 keyPaths, value is set', () => {
          const configs = {
            title: {
              keyPath: [
                ['TemplateStore', 'templates'],
                ['TemplateStore', 'id'],
              ],
              getter: (templates, id, { surfix }) => `${templates[id].content}_${surfix}`,
            },
          };
          expect(selectConfigValue(configs)(state, { surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe' });
        });

        it('2 keyPaths, value is set, no getter', () => {
          const configs = {
            title: {
              keyPath: [
                ['TemplateStore', 'templates'],
                ['TemplateStore', 'id'],
              ],
            },
          };
          expect(selectConfigValue(configs)(state, {})).toEqual({ title: { 1: { content: 'hi ho', other: true } } });
        });

        it('5 keyPaths, value is set', () => {
          const configs = {
            title: {
              keyPath: [
                ['TemplateStore', 'templates'],
                ['TemplateStore', 'id'],
                ['TemplateStore', 'id'],
                ['TemplateStore', 'id'],
                ['TemplateStore', 'id'],
                ['TemplateStore', 'id'],
              ],
              getter: (templates, id1, id2, id3, id4, id5, { surfix }) => `${templates[id1].content}_${surfix}_${id2}_${id3}_${id4}_${id5}`,
            },
          };
          expect(selectConfigValue(configs)(state, { surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe_1_1_1_1' });
        });

        it('value not set', () => {
          const ownState = setKeyValue('id', 2);
          const configs = {
            title: [
              ['TemplateStore', 'templates'],
              ['TemplateStore', 'id'],
              (templates, id) => templates[id] && `${templates[id].content}`,
            ],
          };
          expect(selectConfigValue(configs)(ownState, {})).toEqual({ title: undefined });
        });
      });

      describe('keyPath is undefined', () => {
        it('getter is set', () => {
          const configs = { title: {} };
          expect(selectConfigValue(configs)(state, {})).toEqual({});
        });
      });
    });

    describe('getter', () => {
      it('getter is undefined', () => {
        const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id, 'content'] } };
        expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: 'hi ho' });
      });

      it('getter is function', () => {
        const configs = {
          title: {
            keyPath: ({ id }) => ['TemplateStore', 'templates', id, 'content'],
            getter: (title, { surfix }) => `${title}_${surfix}`,
          },
        };
        expect(selectConfigValue(configs)(state, { id: 1, surfix: 'hehe' })).toEqual({ title: 'hi ho_hehe' });
      });

      it('getter is function, keyPath undefined', () => {
        const configs = {
          title: {
            getter: ({ title, surfix }) => `${title}_${surfix}`,
          },
        };
        expect(selectConfigValue(configs)(state, {})).toEqual({});
      });
    });

    describe('spreadObject', () => {
      it('spreadObject is undefined', () => {
        const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id] } };
        expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: { content: 'hi ho', other: true } });
      });

      it('spreadObject is false', () => {
        const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id], spreadObject: false } };
        expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ title: { content: 'hi ho', other: true } });
      });

      it('spreadObject is true', () => {
        const configs = { title: { keyPath: ({ id }) => ['TemplateStore', 'templates', id], spreadObject: true } };
        expect(selectConfigValue(configs)(state, { id: 1 })).toEqual({ content: 'hi ho', other: true });
      });

      it('should return notSetValue, spreadObject true', () => {
        const configs = { title: { keyPath: true, notSetValue: { hi: 1, ho: 2 }, spreadObject: true } };
        expect(selectConfigValue(configs)(state, {})).toEqual({ hi: 1, ho: 2 });
      });

      it('should return notSetValue not object, spreadObject true', () => {
        const configs = { title: { keyPath: true, notSetValue: 'titleNotSet', spreadObject: true } };
        expect(selectConfigValue(configs)(state, {})).toEqual({ title: 'titleNotSet' });
      });
    });
  });


  describe('invalid type', () => {
    it('should return undefined', () => {
      const configs = { title: true };
      expect(selectConfigValue(configs)(state, {})).toEqual({ title: undefined });
    });

    it('should return notSetValue', () => {
      const configs = { title: { keyPath: true, notSetValue: 'titleNotSet' } };
      expect(selectConfigValue(configs)(state, {})).toEqual({ title: 'titleNotSet' });
    });
  });


  describe('isGetter', () => {
    it('config is not object', () => {
      expect(isGetter(1)).toBe(false);
      expect(isGetter('hi')).toBe(false);
      expect(isGetter([1, 2])).toBe(false);
    });

    it('keyPath undefined, getter function', () => {
      expect(isGetter({ getter: () => 213 })).toBe(true);
    });
  });
});
