import Size = Fayde.Utils.Size;

interface IDisplayObject {
    ZIndex: number;
    //RenderCacheCanvas: HTMLCanvasElement;
    //RenderCacheCtx: CanvasRenderingContext2D;
    Ctx: CanvasRenderingContext2D;
    Init: (sketch?: Fayde.Drawing.SketchContext) => void;
    Initialised: boolean;
    Draw: () => void;
    Width: number;
    Height: number;
    Position: Point;
}

export = IDisplayObject;