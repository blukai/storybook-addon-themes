import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORE_KEY, INIT_THEMES, CHANGE_THEME } from '../constants';
import { getTheme } from '../helpers';

const StoryWrapper = ({ Provider, themes, children, chan, ...restProps }) => {
  const [theme, setTheme] = useState(() => getTheme(
    themes,
    localStorage.getItem(STORE_KEY),
  ));

  const onChange = useCallback(themeName => {
    setTheme(getTheme(themes, themeName));
  }, []);

  useEffect(() => {
    // let ThemeSelector know, that themes are in
    chan.emit(INIT_THEMES, themes);

    chan.on(CHANGE_THEME, onChange);

    return () => {
      chan.removeListener(CHANGE_THEME, onChange);
    };
  }, [chan, onChange]);

  return (
    <Provider theme={theme.provided} {...restProps}>
      {children}
    </Provider>
  );
};

StoryWrapper.propTypes = {
  children: PropTypes.node,

  Provider: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

  chan: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default StoryWrapper;
