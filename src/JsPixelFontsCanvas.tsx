import React from "react";
const sixPlus = require('./six-plus.json');

var { fonts, renderPixels } = require("js-pixel-fonts");

interface Props {
    line1: string,
    line2: string,
    line3: string,
    line4: string,
    font: any,
    foreground: string,
    background: string
};

interface State {
    canvasWidth: number,
    canvasHeight: number,
    pixels?: any
};

const SINGLE_LED_RADIUS = 6;
const LED_SPACING = 4;
const LED_CENTERS_DISTANCE = 2 * SINGLE_LED_RADIUS + LED_SPACING;
export class JsPixelFontsCanvas extends React.Component<Props, State> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    constructor(props: Props) {
        super(props)
        this.state = {
            canvasWidth: (2 * SINGLE_LED_RADIUS + LED_SPACING) * 48,
            canvasHeight: (2 * SINGLE_LED_RADIUS + LED_SPACING) * 28
        }
    }

    componentDidMount() {
        // this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        this.clear();
        console.log(`text=${this.props.line1}`);
        const pixels = renderPixels(this.props.line1, sixPlus);
        const ctx = this.canvasRef.current?.getContext("2d");
        console.log(`${JSON.stringify(pixels)}`);
        const width = pixels.reduce((acc: any, cur: any) => Math.max(0, cur.length), 0);
        const height = pixels.length;

        if (ctx) {
            ctx.fillStyle = "#FCF300";
            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    ctx.strokeStyle = pixels[y][x] ? this.props.foreground : "#616161";
                    ctx.beginPath();
                    ctx.ellipse(10 + LED_CENTERS_DISTANCE * x, 10 + LED_CENTERS_DISTANCE * y, SINGLE_LED_RADIUS, SINGLE_LED_RADIUS, 0, 0, Math.PI * 2, false);
                    if (pixels[y][x]) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                }
            }
        }
    }

    clear() {
        console.log(`text=${this.props.line1}`);
        const ctx = this.canvasRef.current?.getContext("2d");

        ctx?.clearRect(0,0,this.state.canvasWidth, this.state.canvasHeight);
        if (ctx) {
            for (let y = 0; y < this.state.canvasHeight; ++y) {
                for (let x = 0; x < this.state.canvasWidth; ++x) {
                    for (let component = 0; component < 4; ++component) {
                        ctx.strokeStyle = "#616161";
                        ctx.beginPath();
                        ctx.ellipse(10 + LED_CENTERS_DISTANCE * x, 10 + LED_CENTERS_DISTANCE * y, SINGLE_LED_RADIUS, SINGLE_LED_RADIUS, 0, 0, Math.PI * 2, false);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    render() {
        return (
            <div style={{padding:"10px", backgroundColor:"#000000"}}>
                <canvas ref={this.canvasRef} width={this.state.canvasWidth} height={this.state.canvasHeight} style={{backgroundColor:"#000000"}}/>
            </div>
        )
    }
}