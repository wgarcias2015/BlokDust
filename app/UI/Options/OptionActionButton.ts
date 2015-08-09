/**
 * Created by luketwyman on 31/07/2015.
 */

/**
 * Created by luketwyman on 24/02/2015.
 */

import Option = require("./Option");
import ParametersPanel = require("./../OptionsPanel");
import Size = minerva.Size;

class OptionActionButton  extends Option{

    private _Text: string;

    constructor(position: Point, size: Size, name: string, text: string, setting: string) {
        super();

        this.Type = "actionbutton";
        this.Position = position;
        this.Size = size;
        this.Name = name;
        this._Text = text;
        this.Setting = setting;
        this.HandleRoll = [];
    }


    Draw(ctx,units,i,panel) {
        super.Draw(ctx, units, i, panel);

        var x = this.Position.x;
        var y = this.Position.y;
        var height = this.Size.height;
        var origin = this.Origin;
        var dataType = Math.round(units * 10);
        var headerType = Math.round(units * 33);

        // DIVIDERS //
        ctx.globalAlpha = 1;
        ctx.fillStyle = ctx.strokeStyle = App.Palette[1];// Grey
        if (i !== (panel.Options.length - 1)) {
            ctx.beginPath();
            ctx.moveTo(panel.Margin - units, y + height);
            ctx.lineTo(panel.Range + panel.Margin + units, y + height);
            ctx.stroke();
        }
        /*ctx.beginPath();
        ctx.moveTo(panel.Margin + (panel.Range*0.5), y + (height*0.2));
        ctx.lineTo(panel.Margin + (panel.Range*0.5), y + (height* 0.8));

        ctx.moveTo(panel.Margin + (panel.Range*0.65), y + (height*0.2));
        ctx.lineTo(panel.Margin + (panel.Range*0.65), y + (height* 0.8));
        ctx.stroke();*/

        // BUTTON //
        var col = panel.SliderColours[i - (Math.floor(i/panel.SliderColours.length)*(panel.SliderColours.length))];
        ctx.fillStyle = col;// col
        ctx.fillRect(panel.Margin + (panel.Range*0.25), y + (height*0.2), panel.Range*0.5, height*0.6);


        // PARAM NAME //
        ctx.fillStyle = App.Palette[8];// WHITE
        ctx.font = App.Metrics.TxtMid;
        ctx.textAlign = "right";
        ctx.fillText(this.Name.toUpperCase(), panel.Margin - (15 * units), y + (height * 0.5) + (dataType * 0.4));


        // TEXT //
        ctx.textAlign = "center";
        ctx.fillText(this._Text.toUpperCase(), panel.Margin + (panel.Range*0.5), y + (height * 0.5) + (dataType * 0.4));


    }

}

export = OptionActionButton;