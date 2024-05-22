import React, { useState, useRef, useEffect } from 'react';
import audioFile from './assets/marimba-ringtone-10-201160.mp3';
import './App.css';

const TimerLengthControl = ({ title, length, onDecrease, onIncrease, id }) => (
	<div className='length-control'>
		<h2 id={`${id}-label`}>{title}</h2>
		<div className='control-div'>
			<button
				id={`${id}-decrement`}
				onClick={onDecrease}
			>
				-
			</button>
			<div
				id={`${id}-length`}
				className='timer-length'
			>
				{length}
			</div>
			<button
				id={`${id}-increment`}
				onClick={onIncrease}
			>
				+
			</button>
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
		<button
			id='start_stop'
			onClick={onStartStop}
		>
			START/STOP
		</button>
		<button
			id='reset'
			onClick={onReset}
		>
			RESET
		</button>
	</div>
);

const Alarm = ({ audioRef }) => (
	<audio
		id='beep'
		preload='auto'
		src={audioFile}
		ref={audioRef}
	></audio>
);

const App = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [workLength, setWorkLength] = useState(25);
	const [timerState, setTimerState] = useState('stopped');
	const [timerType, setTimerType] = useState('Session');
	const [timer, setTimer] = useState(1500); // 25 minutes in seconds
	const [intervalId, setIntervalId] = useState(null);
	const audioRef = useRef(null);

	useEffect(() => {
		if (timer === 0) {
			playAudio();
			if (timerType === 'Session') {
				setTimeout(switchToBreak, 1000); // Ensure display shows 00:00 before switching
			} else {
				setTimeout(switchToWork, 1000); // Ensure display shows 00:00 before switching
			}
		}
	}, [timer]);

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0; // Reset audio to start
			audioRef.current.play();
		}
	};

	const switchToBreak = () => {
		setTimerType('Break');
		if (breakLength > 0) {
			setTimer(breakLength * 60);
		}
	};

	const switchToWork = () => {
		setTimerType('Session');
		if (workLength > 0) {
			setTimer(workLength * 60);
		}
	};

	const decrementTimer = () => {
		setTimer((prevTimer) => prevTimer - 1);
	};

	const startStopTimer = () => {
		if (timerState === 'stopped') {
			if (timer === 0) {
				if (timerType === 'Session') {
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
		setBreakLength(5);
		setWorkLength(25);
		setTimerType('Session');
		setTimer(1500); // Reset timer to 25 minutes
		playAudio(); // Stop the audio
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	};

	const updateWorkLength = (newLength) => {
		if (newLength > 0 && newLength <= 60) {
			setWorkLength(newLength);
			if (timerState === 'stopped' && timerType === 'Session') {
				setTimer(newLength * 60);
			}
		}
	};

	const updateBreakLength = (newLength) => {
		if (newLength > 0 && newLength <= 60) {
			setBreakLength(newLength);
			if (timerState === 'stopped' && timerType === 'Break') {
				setTimer(newLength * 60);
			}
		}
	};

	const formatTime = () => {
		if (timer === 0 || timer < 0) {
			return '00:00';
		}
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
					onDecrease={() => updateBreakLength(breakLength - 1)}
					onIncrease={() => updateBreakLength(breakLength + 1)}
					id='break'
				/>
				<TimerLengthControl
					title='Session Length'
					length={workLength}
					onDecrease={() => updateWorkLength(workLength - 1)}
					onIncrease={() => updateWorkLength(workLength + 1)}
					id='session'
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
