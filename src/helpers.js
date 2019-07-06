export const getTheme = (themes, themeName) => {
  const theme = themes.find(theme => theme.name === themeName);
  return theme || themes[0];
}
