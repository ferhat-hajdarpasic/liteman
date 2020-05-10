import React from "react";

var { fonts, renderPixels } = require("js-pixel-fonts");

interface Props {
    text: string,
    font: any,
    foreground: string,
    background: string
 };

export class JsPixelFontsCanvas extends React.Component<Props> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    componentDidMount() {
        const ctx = this.canvasRef.current?.getContext("2d");
        const pixels = renderPixels(this.props.text, fonts.sevenPlus);
        const width = pixels.reduce((acc: any, cur: any) => Math.max(acc, cur.length), 0);
        const height = pixels.length;

        if (ctx) {
            ctx.fillStyle = "#ff3300";
            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    ctx.strokeStyle = pixels[y][x] ? this.props.foreground : this.props.background;
                    for (let component = 0; component < 4; ++component) {
                        ctx.beginPath();
                        ctx.ellipse(50 + 25 * x + 50, 50 + 25 * y, 10, 10, 0, 0, Math.PI * 2, false);
                        if (pixels[y][x]) {
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
                <canvas ref={this.canvasRef} width={640} height={425} />
            </div>
        )
    }
}