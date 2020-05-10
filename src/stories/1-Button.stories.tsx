import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { LedCanvas } from '../LedCanvas';
import { JsPixelFontsCanvas } from '../JsPixelFontsCanvas';

var { fonts } = require("js-pixel-fonts");

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const LED = () => (
    <LedCanvas text="fred"></LedCanvas>
);

export const JS_PIXEL_LED = () => (
    <JsPixelFontsCanvas text="fred" font={fonts.sevenPlus} foreground="rgba(50,50,0,0.5)" background="rgba(100,0,0,0.5)">
    </JsPixelFontsCanvas>
);
