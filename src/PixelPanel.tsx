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
const LINE_HEIGHT = 7; //Pixels
export class PixelPanel extends React.Component<Props, State> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    constructor(props: Props) {
        super(props)
        this.state = {
            canvasWidth: (2 * SINGLE_LED_RADIUS + LED_SPACING) * 48,
            canvasHeight: (2 * SINGLE_LED_RADIUS + LED_SPACING) * 28
        }
    }

    componentDidMount() {
        this.clear();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        this.clear();
        this.drawLine(this.props.line1, 1);
        this.drawLine(this.props.line2, 2);
        this.drawLine(this.props.line3, 3);
        this.drawLine(this.props.line4, 4);
    }

    private drawLine(line: string, lineNo: number) {
        const pixels = renderPixels(line, sixPlus);
        const ctx = this.canvasRef.current?.getContext("2d");
        console.log(`${JSON.stringify(pixels)}`);
        const width = pixels.reduce((acc: any, cur: any) => Math.max(0, cur.length), 0);
        const height = pixels.length;

        if (ctx) {
            ctx.fillStyle = "#FCF300";
            for (let rowIndex = 0; rowIndex < height; ++rowIndex) {
                for (let columnIndex = 0; columnIndex < width; ++columnIndex) {
                    ctx.beginPath();
                    this.drawPixel(ctx, columnIndex, rowIndex + LINE_HEIGHT * (lineNo - 1) + ((lineNo > 2)?1:0));
                    if (pixels[rowIndex][columnIndex]) {
                        ctx.fill();
                    }
                }
            }
        }
    }

    private drawPixel(ctx: CanvasRenderingContext2D, columnIndex: number, rowIndex: number) {
        ctx.ellipse(10 + LED_CENTERS_DISTANCE * columnIndex, 10 + LED_CENTERS_DISTANCE * rowIndex, SINGLE_LED_RADIUS, SINGLE_LED_RADIUS, 0, 0, Math.PI * 2, false);
    }

    clear() {
        const ctx = this.canvasRef.current?.getContext("2d");

        ctx?.clearRect(0,0,this.state.canvasWidth, this.state.canvasHeight);
        if (ctx) {
            for (let rowIndex = 0; rowIndex < this.state.canvasHeight; ++rowIndex) {
                for (let columnIndex = 0; columnIndex < this.state.canvasWidth; ++columnIndex) {
                    ctx.strokeStyle = "#616161";
                    ctx.beginPath();
                    this.drawPixel(ctx, columnIndex, rowIndex);
                    ctx.stroke();
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