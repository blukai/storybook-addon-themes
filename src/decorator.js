import React from 'react';
import addons from '@storybook/addons';
import StoryWrapper from './components/StoryWrapper';
import { STORE_KEY } from './constants';

const withThemes = ({ Provider, themes, ...restProps }) => (storyFn, context) => {
  const chan = addons.getChannel();

  return (
    <StoryWrapper
      {...restProps}
      Provider={Provider}
      themes={themes}
      chan={chan}
    >
      {storyFn(context)}
    </StoryWrapper>
  );
};

export default withThemes;
