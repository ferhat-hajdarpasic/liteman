import React from "react";

var { fonts, renderPixels } = require("js-pixel-fonts");

interface Props {
    text: string,
    font: any,
    foreground: string,
    background: string
 };

interface State {
    canvasWidth: number,
    canvasHeight: number,
    pixels: any
};

const SINGLE_LED_RADIUS = 10;
const LED_SPACING = 0;
const LED_CENTERS_DISTANCE = 2 * SINGLE_LED_RADIUS + LED_SPACING;
export class JsPixelFontsCanvas extends React.Component<Props, State> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    constructor(props: Props) {
        super(props)
        const pixels = renderPixels(this.props.text, fonts.sevenPlus);
        this.state = {
            canvasWidth: (2 * SINGLE_LED_RADIUS + LED_SPACING) * pixels[0].length, // - LED_SPACING,
            canvasHeight: (2 * SINGLE_LED_RADIUS + LED_SPACING) * pixels.length, // - LED_SPACING,
            pixels : pixels
        }
    }

    componentDidMount() {
        const ctx = this.canvasRef.current?.getContext("2d");
        console.log(`${JSON.stringify(this.state.pixels)}`);
        const width = this.state.pixels.reduce((acc: any, cur: any) => Math.max(0, cur.length), 0);
        const height = this.state.pixels.length;

        if (ctx) {
            ctx.fillStyle = "#ff3300";
            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    ctx.strokeStyle = this.state.pixels[y][x] ? this.props.foreground : this.props.background;
                    for (let component = 0; component < 4; ++component) {
                        ctx.beginPath();
                        ctx.ellipse(10 + LED_CENTERS_DISTANCE * x, 10 + LED_CENTERS_DISTANCE * y, SINGLE_LED_RADIUS, SINGLE_LED_RADIUS, 0, 0, Math.PI * 2, false);
                        if (this.state.pixels[y][x]) {
                            ctx.fill();
                        } else {
                            ctx.stroke();
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} width={this.state.canvasWidth} height={this.state.canvasHeight} />
            </div>
        )
    }
}