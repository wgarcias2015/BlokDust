import IBlock = require("./IBlock");
import IEffect = require("./IEffect");
import ObservableCollection = Fayde.Collections.ObservableCollection;

interface ISource extends IBlock{
    Effects: Fayde.Collections.ObservableCollection<IEffect>;
    AddEffect(effect: IEffect): void;
    RemoveEffect(effect: IEffect): void;
    BlockType?: any;
    Source?: any; // Use this when available: Tone.Oscillator || Tone.Noise
    Envelope?: Tone.Envelope;
    EffectsChainInput?: Tone.Signal;
    OutputGain?: Tone.Signal;
    Settings?: ToneSettings;
    Params: any;
    Frequency?: number;
    PlaybackRate?: number;
    Grains?: Tone.Player[];
    MaxDensity?: number;
    RecordedAudio?: any;
    PolySources?: any[];
    PolyEnvelopes?: any[];
    LoopStartPosition?: number;
    LoopEndPosition?: number;
    ValidateEffects(): void;
    SetPlaybackRate(rate,time): void;
    TriggerAttack(): void;
    TriggerRelease(): void;
    Refresh(): void;
}

export = ISource;