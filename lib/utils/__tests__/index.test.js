import utils from '../index';

describe('resaga/utils/index', () => {
  it('utils.component is defined', () => {
    expect(utils.component).toBeDefined();
  });
  it('utils.reducer is defined', () => {
    expect(utils.reducer).toBeDefined();
  });
  it('utils.test is defined', () => {
    expect(utils.test).toBeDefined();
  });
  it('utils.sagas is defined', () => {
    expect(utils.sagas).toBeDefined();
  });
});
