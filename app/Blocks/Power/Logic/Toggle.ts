import {Effect} from '../../Effect';
import {IApp} from '../../../IApp';
import {ISource} from '../../ISource';
import {Logic} from './Logic';
import {MainScene} from '../../../MainScene';
import {Particle} from '../../../Particle';
import ImageSource = Fayde.Media.Imaging.ImageSource;

declare var App: IApp;

export class Toggle extends Logic {

    Init(sketch?: any): void {

        this.BlockName = "Toggle Power";

        super.Init(sketch);

        this.Outline.push(new Point(0,-1), new Point(1,0), new Point(1,2), new Point(0,2), new Point(-1,1), new Point(-1,-1));
    }

    UpdateConnections() {
        const newConnections: ISource[] = this.Connections.ToArray();

        this.OldConnections.forEach((source: ISource) => {
            //if toggle is on and is no longer connected to a source, remove power.
            if (this.Params.logic && (newConnections.indexOf(source) === -1)) {
                source.RemovePower();
            }
        });

        newConnections.forEach((source: ISource) => {
            //if toggle is on and source isn't already connected, add power
            if (this.Params.logic && (this.OldConnections.indexOf(source) === -1)) {
                source.AddPower();
            }
        });

        this.OldConnections = newConnections;
    }

    Draw() {
        super.Draw();
        (<MainScene>this.Sketch).BlockSprites.Draw(this.Position,true,"toggle power");
    }

    UpdateOptionsForm() {
        super.UpdateOptionsForm();

        this.OptionsForm =
        {
            "name" : "Toggle Power",
            "parameters" : [

                {
                    "type" : "switches",
                    "name" : "Power",
                    "setting" :"",
                    "switches": [
                        {
                            "name": "Off/On",
                            "setting": "logic",
                            "value": this.Params.logic,
                            "lit" : true,
                            "mode": "offOn"
                        }
                    ]
                }
            ]
        };
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);

        if (param=="logic") {
            this.PerformLogic();
        }

        this.Params[""+param] = value;
    }

    PerformLogic() {
        if (this.Params.logic) {
            this.Params.logic = false;
            let connections: ISource[] = this.Connections.ToArray();
            connections.forEach((source: ISource) => {
                source.RemovePower();
            });

        } else {
            this.Params.logic = true;
            let connections: ISource[] = this.Connections.ToArray();
            connections.forEach((source: ISource) => {
                source.AddPower();
            });
        }
        App.MainScene.LaserBeams.UpdateAllLasers = true;
        this.RefreshOptionsPanel();
    }

    Stop() {
        if (this.Params.logic) {
            const connections = this.Connections.ToArray();
            connections.forEach((source:ISource) => {
                source.RemovePower();
            });
        }
    }
}