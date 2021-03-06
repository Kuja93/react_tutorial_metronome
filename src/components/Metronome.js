import React from 'react';

import '../resources/style/Metronome.css';

import click1 from '../resources/sound/click1.wav';
import click2 from '../resources/sound/click2.wav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState({
                    count: 0,
                    playing: true
                },
                this.playClick
            );
        }
    }

    playClick = () => {
        if (this.state.count % this.state.beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    handleBpmChange = e => {
        const bpm = e.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm });
        }
    }

    render() {
        return (
            <div className="metronome" >
                <div className="bpm-slider">
                    <FontAwesomeIcon icon={faSkull} size={"2x"}/>
                     <div className={"bpm-container"}>
                        {this.state.bpm} BPM
                    </div>
                    <input
                        type="range"
                        min="60"
                        max="240"
                        value={this.state.bpm}
                        onChange={this.handleBpmChange}/>
                </div>
                {this.state.playing ?
                    <button onClick={this.startStop} style={{backgroundColor: "#FF0000"}}>
                        <FontAwesomeIcon icon={faStop} size={"2x"}/>
                    </button> :
                    <button onClick={this.startStop} style={{backgroundColor: "#1b9b4e"}}>
                        <FontAwesomeIcon icon={faPlay} size={"2x"}/>
                    </button>
                }
            </div>
        )
    }
}

export default Metronome;