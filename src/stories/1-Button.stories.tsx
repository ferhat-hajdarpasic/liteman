import React, { Fragment } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { LedCanvas } from '../LedCanvas';
import { PixelPanel } from '../PixelPanel';
import { useState } from 'react';

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

export const JS_PIXEL_LED = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [line4, setLine4] = useState("");
  return <div style={{display: "flex",flexWrap: "nowrap"}}>
        <div style={{display: "flex", flexDirection:"column", marginRight:"50px"}}>
            <input value={line1} onChange={e => setLine1(e.target.value)} type="text" />
            <input value={line2} onChange={e => setLine2(e.target.value)} type="text" />
            <input value={line3} onChange={e => setLine3(e.target.value)} type="text" />
            <input value={line4} onChange={e => setLine4(e.target.value)} type="text" />
        </div>
        <PixelPanel 
            line1={line1} 
            line2={line2} 
            line3={line3} 
            line4={line4} 
            font={fonts.sevenPlus} foreground="rgba(50,50,0,0.5)" background="rgba(100,0,0,0.5)" 
        />
        {/* <JsPixelFontsCanvas text="Hajdarpasic" font={fonts.sevenPlus} foreground="rgba(50,50,0,0.5)" background="rgba(100,0,0,0.5)" /> */}
        {/* <JsPixelFontsCanvas text="Lived" font={fonts.sevenPlus} foreground="rgba(50,50,0,0.5)" background="rgba(100,0,0,0.5)" /> */}
        {/* <JsPixelFontsCanvas text="Here!      " font={fonts.sevenPlus} foreground="rgba(50,50,0,0.5)" background="rgba(100,0,0,0.5)" /> */}
    </div>
};
