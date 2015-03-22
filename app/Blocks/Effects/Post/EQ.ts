import PostEffect = require("../PostEffect");
import Grid = require("../../../Grid");
import BlocksSketch = require("../../../BlocksSketch");

class EQ extends PostEffect {

    public Effect: Tone.MultibandEQ;

    Init(sketch?: Fayde.Drawing.SketchContext): void {

        this.Effect = new Tone.MultibandEQ([
            {
                "type" : "lowshelf",
                "frequency" : 50,
                "rolloff" : -12,
                "Q" : 1,
                "gain" : 0
            },
            {
                "type" : "peaking",
                "frequency" : 400,
                "rolloff" : -12,
                "Q" : 2.5,
                "gain" : 0
            },
            {
                "type" : "peaking",
                "frequency" : 2000,
                "rolloff" : -12,
                "Q" : 2.5,
                "gain" : 0
            },
            {
                "type" : "highshelf",
                "frequency" : 10000,
                "rolloff" : -12,
                "Q" : 1,
                "gain" : 0
            }
        ]);

        super.Init(sketch);

        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, -1),new Point(2, 0),new Point(1, 1),new Point(0, 1));
    }

    Draw() {
        super.Draw();
        (<BlocksSketch>this.Sketch).BlockSprites.Draw(this.Position,true,"eq");
    }

    Dispose(){
        this.Effect.dispose();
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);

        var paramWithBand = param.split("-"),
            param = paramWithBand[0],
            band = parseInt(paramWithBand[1]);

        console.log("param "+param+"; band: "+band);

        var jsonVariable = {};
        jsonVariable[param] = value;

        switch (param){
            case "frequency" : this.Effect.setFrequency(value, band);
                break;
            case "Q" : this.Effect.setQ(value, band);
                break;
            case "gain" : this.Effect.setGain(value, band);
                break;
        }
    }

    GetParam(param: string) {
        super.GetParam(param);

        var paramWithBand = param.split("-"),
            param = paramWithBand[0],
            band = parseInt(paramWithBand[1]),
            val;

        switch (param){
            case "frequency": val = this.Effect.getFrequency(band);
                break;
            case "Q": val = this.Effect.getQ(band);
                break;
            case "gain": val = this.Effect.getGain(band);
                break;
        }

        return val;
    }

    OpenParams() {
        super.OpenParams();

        this.OptionsForm =
        {
            "name": "EQ",
            "parameters": [

                {
                    "type" : "parametric",
                    "name": "Filter",
                    "setting": "parametric",
                    "nodes": [
                        {
                            "x_setting": "frequency-1",
                            "x_value": this.GetParam("frequency-1"),
                            "x_min": 20,
                            "x_max": 20000,

                            "y_setting": "gain-1",
                            "y_value": this.GetParam("gain-1"),
                            "y_min": -50,
                            "y_max": 30,

                            "q_setting": "Q-1",
                            "q_value": this.GetParam("Q-1"),
                            "q_min": 20,
                            "q_max": 1
                        },

                        {
                            "x_setting": "frequency-2",
                            "x_value": this.GetParam("frequency-2"),
                            "x_min": 20,
                            "x_max": 20000,

                            "y_setting": "gain-2",
                            "y_value": this.GetParam("gain-2"),
                            "y_min": -50,
                            "y_max": 30,

                            "q_setting": "Q-2",
                            "q_value": this.GetParam("Q-2"),
                            "q_min": 14,
                            "q_max": 0.5
                        },

                        {
                            "x_setting": "frequency-3",
                            "x_value": this.GetParam("frequency-3"),
                            "x_min": 20,
                            "x_max": 20000,

                            "y_setting": "gain-3",
                            "y_value": this.GetParam("gain-3"),
                            "y_min": -50,
                            "y_max": 30,

                            "q_setting": "Q-3",
                            "q_value": this.GetParam("Q-3"),
                            "q_min": 14,
                            "q_max": 0.5
                        },

                        {
                            "x_setting": "frequency-4",
                            "x_value": this.GetParam("frequency-4"),
                            "x_min": 20,
                            "x_max": 20000,

                            "y_setting": "gain-4",
                            "y_value": this.GetParam("gain-4"),
                            "y_min": -50,
                            "y_max": 30,

                            "q_setting": "Q-4",
                            "q_value": this.GetParam("Q-4"),
                            "q_min": 20,
                            "q_max": 1
                        }
                    ]
                }
            ]
        };
    }
}

export = EQ;