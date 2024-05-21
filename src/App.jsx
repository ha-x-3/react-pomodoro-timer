import React, { useState, useRef, useEffect } from 'react';
import audioFile from './assets/marimba-ringtone-10-201160.mp3';
import './App.css';

const TimerLengthControl = ({ title, length, onDecrease, onIncrease }) => (
	<div className='length-control'>
		<h2>{title}</h2>
		<div className='control-div'>
			<button onClick={onDecrease}>-</button>
			<div className='timer-length'>{length}</div>
			<button onClick={onIncrease}>+</button>
		</div>
	</div>
);

const TimerDisplay = ({ timerType, timeLeft }) => (
	<div className='timer'>
		<div id='timer-label'>{timerType}</div>
		<div id='time-left'>{timeLeft}</div>
	</div>
);

const TimerControls = ({ onStartStop, onReset }) => (
	<div className='timer-controls'>
		<button onClick={onStartStop}>START/STOP</button>
		<button onClick={onReset}>RESET</button>
	</div>
);

const Alarm = ({ audioRef }) => (
	<audio
		id='alarm'
		preload='auto'
		src={audioFile}
		ref={audioRef}
	></audio>
);

const App = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [workLength, setWorkLength] = useState(25);
	const [timerState, setTimerState] = useState('stopped');
	const [timerType, setTimerType] = useState('Work');
	const [timer, setTimer] = useState(1500); // 25 minutes in seconds
	const [intervalId, setIntervalId] = useState(null);
	const [audioIntervalId, setAudioIntervalId] = useState(null);
	const audioRef = useRef(null);

	useEffect(() => {
		if (timer === 0) {
			playAudio();
			clearInterval(intervalId);
			setTimerState('stopped');
			startAudioInterval();
		}
	}, [timer]);

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const startAudioInterval = () => {
		const id = setInterval(playAudio, 1000);
		setAudioIntervalId(id);
	};

	const stopAudioInterval = () => {
		if (audioIntervalId) {
			clearInterval(audioIntervalId);
			setAudioIntervalId(null);
		}
	};

	const switchToBreak = () => {
		setTimerType('Break');
		setTimer(breakLength * 60);
	};

	const switchToWork = () => {
		setTimerType('Work');
		setTimer(workLength * 60);
	};

	const decrementTimer = () => {
		setTimer((prevTimer) => prevTimer - 1);
	};

	const startStopTimer = () => {
		if (timerState === 'stopped') {
			if (timer === 0) {
				stopAudioInterval();
				if (timerType === 'Work') {
					switchToBreak();
				} else {
					switchToWork();
				}
			}
			setTimerState('running');
			const id = setInterval(decrementTimer, 1000);
			setIntervalId(id);
		} else {
			setTimerState('stopped');
			clearInterval(intervalId);
		}
	};

	const resetTimer = () => {
		setTimerState('stopped');
		clearInterval(intervalId);
		stopAudioInterval();
		setBreakLength(5);
		setWorkLength(25);
		setTimerType('Work');
		setTimer(1500);
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	};

	const updateWorkLength = (newLength) => {
		setWorkLength(newLength);
		if (timerState === 'stopped' && timerType === 'Work') {
			setTimer(newLength * 60);
		}
	};

	const updateBreakLength = (newLength) => {
		setBreakLength(newLength);
		if (timerState === 'stopped' && timerType === 'Break') {
			setTimer(newLength * 60);
		}
	};

	const formatTime = () => {
		const minutes = Math.floor(timer / 60);
		const seconds = timer % 60;
		return `${minutes < 10 ? '0' : ''}${minutes}:${
			seconds < 10 ? '0' : ''
		}${seconds}`;
	};

	return (
		<div className='app'>
			<div className='main-title'>
				<h1>Pomodoro Timer</h1>
			</div>
			<div id='timers-div'>
				<TimerLengthControl
					title='Break Length'
					length={breakLength}
					onDecrease={() =>
						updateBreakLength(Math.max(1, breakLength - 1))
					}
					onIncrease={() =>
						updateBreakLength(Math.min(60, breakLength + 1))
					}
				/>
				<TimerLengthControl
					title='Work Length'
					length={workLength}
					onDecrease={() =>
						updateWorkLength(Math.max(1, workLength - 1))
					}
					onIncrease={() =>
						updateWorkLength(Math.min(60, workLength + 1))
					}
				/>
			</div>
			<TimerDisplay
				timerType={timerType}
				timeLeft={formatTime()}
			/>
			<TimerControls
				onStartStop={startStopTimer}
				onReset={resetTimer}
			/>
			<Alarm audioRef={audioRef} />
			<small>
				Sound Effect by{' '}
				<a href='https://pixabay.com/users/floraphonic-38928062/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201160'>
					floraphonic
				</a>{' '}
				from{' '}
				<a href='https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201160'>
					Pixabay
				</a>
			</small>
		</div>
	);
};

export default App;
