import dotProp from 'dot-prop-immutable';

export const CONFIG = {
  setValue: {
    nodes: ['normaliseStore', 'nodes'],
    content: ({ updateId }) => ['normaliseStore', 'nodes', updateId, 'content'],
    checklists: ({ updateChecklist }) => ['normaliseStore', 'nodes', updateChecklist, 'checklists'],
  },

  value: {
    node1Content: ['normaliseStore', 'nodes', 1, 'content'],
    content: ({ updateId }) => ['normaliseStore', 'nodes', updateId, 'content'],
    nodeIdContent: ({ id }) => ['normaliseStore', 'nodes', id, 'content'],
    checklists: ({ updateChecklist }) => ['normaliseStore', 'nodes', updateChecklist, 'checklists'],
    node1Checklists: {
      keyPath: ['normaliseStore', 'nodes', 1, 'checklists'],
    },
    nodeIdChecklists: {
      keyPath: ['normaliseStore', 'nodes'],
      getter: (nodes, { id }) => dotProp.get(nodes, `${id}.checklists`),
    },
    nodeIdChildIdChecklists: {
      cacheKey: 'nodeIdChildIdChecklists',
      props: null,
      keyPath: [
        ({ id }) => ['normaliseStore', 'nodes', id, 'checklists'],
        ({ childId }) => ['normaliseStore', 'nodes', childId, 'checklists'],
      ],
      getter: (ids = [], childIds = []) => [...ids, ...childIds],
    },
    nodeIdChecklistsCount: {
      keyPath: [
        ({ id }) => ['normaliseStore', 'nodes', id, 'checklists', 'length'],
      ],
    },
    nodeIdChildIdCount: {
      props: null,
      keyPath: [
        ({ id }) => ['normaliseStore', 'nodes', id, 'checklists', 'length'],
        ({ childId }) => ['normaliseStore', 'nodes', childId, 'checklists', 'length'],
      ],
      getter: (idCount, childIdCount) => idCount + childIdCount,
    },
    nodeIdContentGetter: {
      props: null,
      keyPath: ({ id }) => ['normaliseStore', 'nodes', id, 'content'],
      getter: (content) => `Content: ${content}`,
    },
    nodeIdContentGetterExtras: {
      keyPath: ({ id }) => ['normaliseStore', 'nodes', id, 'content'],
      getter: (content, { childId }) => `Content: ${content} - ChildId ${childId}`,
    },
    nodeIdContentGetterOnly: {
      getter: ({ nodeIdContentGetter }) => `${nodeIdContentGetter} (*getter)`,
    },
    idsChecklists: {
      cacheKey: 'idsChecklists',
      keyPath: ({ ids }) => ids.map((id) => ['normaliseStore', 'nodes', id, 'checklists']),
      props: null,
      getter: (...results) => results.reduce((accu = [], value = []) => [...accu, ...value], []),
    },
    idsCount: {
      keyPath: ({ ids }) => ids.map((id) => ['normaliseStore', 'nodes', id, 'checklists', 'length']),
      props: () => 0,
      getter: (...results) => results.reduce((accu, value) => accu + value, 0),
    },
    idsCountExtra: {
      keyPath: ({ ids }) => ids.map((id) => ['normaliseStore', 'nodes', id, 'checklists', 'length']),
      props: ({ id }) => id,
      getter: (...results) => results.reduce((accu, value) => accu + value, 0),
    },
    idsCountExtras: {
      keyPath: ({ ids }) => ids.map((id) => ['normaliseStore', 'nodes', id, 'checklists', 'length']),
      props: [
        ({ id }) => id,
        ({ childId }) => childId,
      ],
      getter: (...results) => results.reduce((accu, value) => accu + value, 0),
    },
    idsChecklistsExtras: {
      cacheKey: 'idsChecklistsExtras',
      keyPath: ({ ids }) => ids.map((id) => ['normaliseStore', 'nodes', id, 'checklists']),
      props: [
        ({ extras1 }) => extras1,
        ({ extras2 }) => extras2,
      ],
      getter: (...results) => results.reduce((accu = [], value = []) => [...accu, ...value], []),
    },
  },
};
