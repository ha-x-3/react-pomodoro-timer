import './App.css';

function App() {
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
			</div>
		</>
	);
}

export default App;
