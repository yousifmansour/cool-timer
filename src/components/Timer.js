import React from 'react';
import Pizzicato from 'pizzicato';
import './Timer.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 30,
            seconds: 0,
            on: false,
            timeLeft: 0
        };

        this.intervalId = 0;
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toggleTimer = () => {
        this.setState({
            on: !this.state.on
        }, () => {
            // when state is done
            if (this.state.on) {
                // start timer
                this.startTimer();
            } else 
                this.stopTimer();
            }
        );
    }

    startTimer = () => {
        const totalTime = +this.state.hours * 60 * 60 + + this.state.minutes * 60 + + this.state.seconds;
        let timeLeft = totalTime;
        this.setState({timeLeft});
        this.intervalId = setInterval(() => {
            timeLeft--;
            this.setState({timeLeft});
            if (timeLeft === 0) {
                this.makeNoise();
                this.stopTimer();
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.intervalId);
        this.setState({
            timeLeft: 0
        }, () => {
            if (this.state.on) {
                setTimeout(() => {
                    this.startTimer()
                }, 3000);
            }
        });
    }

    makeNoise = () => {

        var sawtoothWave = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sawtooth',
                frequency: 329.63
            }
        });

        var sawtoothWave2 = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sawtooth',
                frequency: 440.00
            }
        });

        var sawtoothWave3 = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sawtooth',
                frequency: 554.37	
            }
        });

        var delay = new Pizzicato
            .Effects
            .Delay();

        sawtoothWave.addEffect(delay);
        sawtoothWave2.addEffect(delay);
        sawtoothWave3.addEffect(delay);

        sawtoothWave.play();

        setTimeout(() => {
            sawtoothWave.stop();
            sawtoothWave2.play();
        }, 1000);

        setTimeout(() => {
            sawtoothWave2.stop();
            sawtoothWave3.play();
        }, 2000);

        setTimeout(() => {
            sawtoothWave3.stop();
        }, 3000);

    }

    render() {
        const {hours, minutes, seconds, on} = this.state;
        const buttonText = on
            ? 'Stop'
            : 'Start';
        return (
            <div className="timer-container">
                <h3>choose period for timer</h3>

                <div className='options'>
                    <label htmlFor='hours'>hours</label>
                    <input
                        id='hours'
                        name='hours'
                        value={hours}
                        type='number'
                        onChange={this.handleChange}/>
                    <label htmlFor='minutes'>minutes</label>
                    <input
                        id='minutes'
                        name='minutes'
                        value={minutes}
                        type='number'
                        onChange={this.handleChange}/>
                    <label htmlFor='seconds'>seconds</label>
                    <input
                        id='seconds'
                        name='seconds'
                        value={seconds}
                        type='number'
                        onChange={this.handleChange}/>
                </div>
                <div className='controls'>
                    <button onClick={this.toggleTimer}>{buttonText}</button>
                </div>
                {on
                    ? <div>
                            {`${this.state.timeLeft} seconds left`}
                        </div>
                    : null}
            </div>
        );
    }
}

export default Timer;