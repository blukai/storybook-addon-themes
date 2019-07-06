import React from 'react';
import addons from '@storybook/addons';
import StoryWrapper from './components/StoryWrapper';
import { STORE_KEY } from './constants';

const withThemes = ({ ThemeProvider, themes }) => (storyFn, context) => {
  const chan = addons.getChannel();
  // passin theme through chan doesn't work well
  // for functions that are inside of theme,
  // but it works perfectly this way :)
  window[STORE_KEY] = themes;

  return (
    <StoryWrapper ThemeProvider={ThemeProvider} chan={chan}>
      {storyFn(context)}
    </StoryWrapper>
  );
};

export default withThemes;
