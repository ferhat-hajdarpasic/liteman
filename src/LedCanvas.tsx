import React from "react";
import image1 from "./image-2020-03-27-15-07-05-713.webp"

interface Props {
    text: string
 };

export class LedCanvas extends React.Component<Props> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    imageRef: React.RefObject<HTMLImageElement> = React.createRef();
    componentDidMount() {
        const ctx = this.canvasRef.current?.getContext("2d");
        const image = this.imageRef.current;
        if (image && ctx) {
            image.onload = () => {
                ctx.drawImage(image, 0, 0)
                ctx.font = "40px Courier"
                ctx.fillText(this.props.text, 210, 75)
            }
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} width={640} height={425} />
                <img ref={this.imageRef} src={image1} alt="" hidden/>
            </div>
        )
    }
}