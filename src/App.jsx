import React from 'react';
import audioFile from './assets/marimba-ringtone-10-201160.mp3';
import './App.css';

function App() {

  const audioRef = React.useRef(null);

  const playAudio = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
  };

	return (
		<>
			<div className='app'>
				<div className='main-title'>
					<h1>Pomodoro Timer</h1>
				</div>
				<div id='timers-div'>
					<div className='length-control'>
						<h2 id='break-label'>Break Length</h2>
						<div className='control-div'>
							<button
								id='break-decrement'
								value='-'
							>
								-
							</button>
							<div
								className='timer-length'
								id='break-length'
							>
								5
							</div>
							<button
								id='break-increment'
								value='+'
							>
								+
							</button>
						</div>
					</div>
					<div className='length-control'>
						<h2 id='work-label'>Work Length</h2>
						<div className='control-div'>
							<button
								id='work-decrement'
								value='-'
							>
								-
							</button>
							<div
								className='timer-length'
								id='work-length'
							>
								25
							</div>
							<button
								id='work-increment'
								value='+'
							>
								+
							</button>
						</div>
					</div>
				</div>
				<div className='timer'>
					<div id='timer-label'>Work</div>
					<div id='time-left'>25:00</div>
				</div>
				<div className='timer-controls'>
					<button id='start-stop'>START</button>
					<button id='reset'>RESET</button>
				</div>
				<button onClick={playAudio}>PLAY</button>
				<audio
					id='alarm'
					preload='auto'
					src={audioFile}
					ref={audioRef}
				></audio>
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
		</>
	);
}

export default App;
