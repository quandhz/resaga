/**
 * Created by Windows8 on 6/22/2017.
 */
/* eslint arrow-body-style: 0 */
const matchMedia = () => {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};
window.matchMedia = window.matchMedia || matchMedia;
