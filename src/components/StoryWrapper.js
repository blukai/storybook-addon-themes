import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORE_KEY, INIT_THEMES, CHANGE_THEME } from '../constants';
import { findTheme } from '../helpers';

const StoryWrapper = ({ ThemeProvider, children, chan }) => {
  const [theme, setTheme] = useState(() => findTheme(
    window[STORE_KEY],
    localStorage.getItem(STORE_KEY),
  ));

  const onChange = useCallback(themeName => {
    setTheme(findTheme(window[STORE_KEY], themeName));
  }, []);

  useEffect(() => {
    // let ThemeSelector know, that themes are in
    chan.emit(INIT_THEMES, window[STORE_KEY]);

    chan.on(CHANGE_THEME, onChange);

    return () => {
      chan.removeListener(CHANGE_THEME, onChange);
    };
  }, [chan, onChange]);

  return (
    <ThemeProvider theme={theme.provided}>
      {children}
    </ThemeProvider>
  );
};

StoryWrapper.propTypes = {
  children: PropTypes.node,

  ThemeProvider: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

  chan: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default StoryWrapper;
