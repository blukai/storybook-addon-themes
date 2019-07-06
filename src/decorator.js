import React from 'react';
import addons from '@storybook/addons';
import StoryWrapper from './components/StoryWrapper';
import { STORE_KEY } from './constants';

const withThemes = ({ ThemeProvider, themes }) => (storyFn, context) => {
  const chan = addons.getChannel();

  return (
    <StoryWrapper
      ThemeProvider={ThemeProvider}
      themes={themes}
      chan={chan}
    >
      {storyFn(context)}
    </StoryWrapper>
  );
};

export default withThemes;
