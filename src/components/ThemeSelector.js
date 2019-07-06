import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { STORE_KEY, INIT_THEMES, CHANGE_THEME } from '../constants';
import { getTheme } from '../helpers';

const ThemeSelector = ({ api, chan }) => {
  const [shown, setShown] = useState(false);

  const onVisibilityChange = useCallback(v => {
    if (v !== shown) {
      setShown(v);
    }
  }, [shown]);

  const [themes, setThemes] = useState(() => []);

  const onInit = useCallback(ths => {
    setThemes(ths);

    const theme = getTheme(ths, localStorage.getItem(STORE_KEY));
    api.setOptions({ theme: theme.storybook });
  }, [api]);

  useEffect(() => {
    chan.on(INIT_THEMES, onInit);

    return () => {
      chan.removeListener(INIT_THEMES, onInit);
    };
  }, [chan, onInit]);

  const themeList = shown && themes.map(th => ({
    id: th.name,
    title: th.name,
    onClick: () => {
      chan.emit(CHANGE_THEME, th.name);
      api.setOptions({ theme: th.storybook });
      localStorage.setItem(STORE_KEY, th.name);

      setShown(false);
    },
    active: localStorage.getItem(STORE_KEY) === th.name,
  }));

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={shown}
      onVisibilityChange={onVisibilityChange}
      tooltip={<TooltipLinkList links={themeList} />}
      closeOnClick
    >
      <IconButton active={shown} title="Themes">
        <Icons icon="mirror" />
      </IconButton>
    </WithTooltip>
  );
};

ThemeSelector.propTypes = {
  api: PropTypes.shape({
    getCurrentParameter: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  chan: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired,
  }),
};

export default ThemeSelector;
