import {Block} from '../Block';
import {Effect} from '../Effect';
import {IApp} from '../../IApp';
import {MainScene} from '../../MainScene';
import {Particle} from '../../Particle';
import {Source} from '../Source';

declare var App: IApp;

export class ToneSource extends Source {

    public Sources: Tone.Oscillator[];
    public Envelopes: Tone.AmplitudeEnvelope[];
    public Params: ToneSourceParams;
    public Defaults: ToneSourceParams;

    Init(sketch?: any): void {

        this.BlockName = "Tone";

        this.Defaults = {
            frequency: App.Config.BaseNote,
            waveform: 2,
            baseFrequency: 0,
            fine: 0
        };
        this.PopulateParams();


        // If it's an older save before we had baseFrequency
        /*if (this.Params.baseFrequency) {
            this.Params.frequency = App.Config.BaseNote * App.Audio.Tone.intervalToFrequencyRatio(this.Params.baseFrequency);
            console.log("IF");
        }*/

        super.Init(sketch);

        this.CreateSource();
        this.CreateEnvelope();

        this.Envelopes.forEach((e: Tone.AmplitudeEnvelope)=> {
            e.connect(this.AudioInput);
        });

        this.Sources.forEach((s: Tone.Oscillator, i: number)=> {
            s.connect(this.Envelopes[i]);
            s.start();
        });

        // Define Outline for HitTest
        this.Outline.push(new Point(-2, 0), new Point(0, -2), new Point(2, 0), new Point(1, 1), new Point(-1, 1));
    }

    BackwardsCompatibilityPatch() {
        this.Params.frequency = this.GetFrequency();
    }

    CreateSource(){
        // add it to the list of sources
        this.Sources.push( new Tone.Oscillator(this.GetFrequency(), this.WaveIndex[this.Params.waveform]));

        // return it
        return super.CreateSource();
    }

    CreateEnvelope(){
        this.Envelopes.push( new Tone.AmplitudeEnvelope(
            this.Settings.envelope.attack,
            this.Settings.envelope.decay,
            this.Settings.envelope.sustain,
            this.Settings.envelope.release
        ));

        return super.CreateEnvelope();
    }

    Dispose() {
        super.Dispose();

        this.Sources.forEach((s: any) => {
            s.dispose();
        });

        this.Envelopes.forEach((e: any) => {
            e.dispose();
        });

    }

    Update() {
        super.Update();
    }

    Draw() {
        super.Draw();
        (<MainScene>this.Sketch).BlockSprites.Draw(this.Position,true,"tone");
    }

    UpdateOptionsForm() {
        super.UpdateOptionsForm();

        this.OptionsForm =
        {
            "name" : "Tone",
            "parameters" : [
                {
                    "type" : "slider",
                    "name" : "Note",
                    "setting" :"baseFrequency",
                    "props" : {
                        "value" : this.Params.baseFrequency,
                        "min" : -48,
                        "max" : 48,
                        "quantised" : true,
                        "centered" : true,
                        "convertDisplay" : this.DisplayNote
                    }
                },
                {
                    "type" : "slider",
                    "name" : "Fine",
                    "setting" :"fine",
                    "props" : {
                        "value" : this.Params.fine,
                        "min" : -1,
                        "max" : 1,
                        "quantised" : false,
                        "centered" : true
                    }
                },
                {
                    "type" : "buttons",
                    "name" : "Wave",
                    "setting" :"waveform",
                    "props" : {
                        "value" : this.Params.waveform,
                        "mode" : "wave"
                    },
                    "buttons": [
                        {
                            "name" : "Sine"
                        },
                        {
                            "name" : "Square"
                        },
                        {
                            "name" : "Triangle"
                        },
                        {
                            "name" : "Saw"
                        }
                    ]
                }

            ]
        };
    }

    SetParam(param: string,value: any) {

        switch(param) {
            case 'baseFrequency':
                console.log('before setting change: '+this.Sources[0].frequency);
                //FIXME: Frequency not changing whilst playing
                this.Sources[0].frequency.value = this.GetFrequency(value,this.Params.fine);
                console.log('after setting change: '+this.Sources[0].frequency)
                const octave = Math.floor(value / 12) + 4;
                const note = App.Audio.NoteIndex[Math.abs(value%12)];
                console.log(`Note: ${note}${octave}`);
                break;
            case 'fine':
                this.Sources[0].frequency.value = this.GetFrequency(this.Params.baseFrequency, value);
                break;
        }

        this.Params[param] = value;

        super.SetParam(param,value);
    }

    DisplayNote(value: number) {
        const octave = Math.floor(value / 12) + 4;
        const note = App.Audio.NoteIndex[Math.abs(value%12)];
        return "" + note + "" + octave;
    }

    GetFrequency(baseFrequency?: number, fine?: number) {
        baseFrequency = baseFrequency || this.Params.baseFrequency;
        fine = fine || this.Params.fine;
        return App.Config.BaseNote * App.Audio.Tone.intervalToFrequencyRatio(baseFrequency + fine);
    }
}