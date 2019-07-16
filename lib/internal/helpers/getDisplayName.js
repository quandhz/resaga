export default (Component) => {
  if (Component) {
    if (Component.displayName) return Component.displayName;
    if (Component.name) return Component.name;
  }
  return 'Component';
};
