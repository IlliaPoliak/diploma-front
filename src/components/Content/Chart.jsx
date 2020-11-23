import Chart from 'chart.js';
import { useEffect, useRef } from 'react';

const Charts = ({ data }) => {

	const chartRef = useRef()
	const chartXRef = useRef()
	const chartDvarkxRef = useRef()
	const chartSigmaxRef = useRef()
	const chartPxRef = useRef()
	const chartTauxRef = useRef()

	const config = (array, label, color) => {

		return {
			type: 'line',
			data: {
				labels: data.x2.map((item, i) => i),
				datasets: [{
					label: label,
					backgroundColor: color,
					borderColor: color,
					data: array,
					fill: false,
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: false,
				},
				tooltips: {
					mode: 'index',
					intersect: true,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: false,
						}
					}]
				}
			}
		}
	}

	const allDataConfig = {
		type: 'line',
			data: {
				labels: data.x2.map((item, i) => i),
				datasets: [{
					label: 'x',
					backgroundColor: 'orange',
					borderColor: 'orange',
					data: data.x2,
					fill: false,
				},
				{
					label: 'dvarkx',
					backgroundColor: 'violet',
					borderColor: 'violet',
					data: data.Dvakx2,
					fill: false,
				},
				{
					label: 'sigmax',
					backgroundColor: 'blue',
					borderColor: 'blue',
					data: data.Sigmax2,
					fill: false,
				},
				{
					label: 'px',
					backgroundColor: 'red',
					borderColor: 'red',
					data: data.px2,
					fill: false,
				},
				{
					label: 'taux',
					backgroundColor: 'green',
					borderColor: 'green',
					data: data.taux2,
					fill: false,
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: false,
				},
				tooltips: {
					mode: 'index',
					intersect: true,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: false,
						}
					}]
				}
			}
	}

	const renderChart = () => {
		var canvas = chartRef.current.getContext('2d');
		var canvas_x = chartXRef.current.getContext('2d');
		var canvas_dvarkx = chartDvarkxRef.current.getContext('2d');
		var canvas_sigmax = chartSigmaxRef.current.getContext('2d');
		var canvas_px = chartPxRef.current.getContext('2d');
		var canvas_taux = chartTauxRef.current.getContext('2d');

		new Chart(canvas, allDataConfig);
		new Chart(canvas_x, config(data.x2, 'x', 'orange'));
		new Chart(canvas_dvarkx, config(data.Dvakx2, 'dvarkx', 'violet'));
		new Chart(canvas_sigmax, config(data.Sigmax2, 'sigmax', 'blue'));
		new Chart(canvas_px, config(data.px2, 'px', 'red'));
		new Chart(canvas_taux, config(data.taux2, 'taux', 'green'));
	};

	useEffect(() => {
		renderChart()
	}, [data])

	return (
		<div className='canvas_container'>
			<h2>Графіки</h2>
			<div className='canvas_wrapper'>
				<canvas ref={chartRef} id="canvas"></canvas>
			</div>
			<div className='canvas_wrapper'>
				<canvas ref={chartXRef} id="canvas_x"></canvas>
			</div>
			<div className='canvas_wrapper'>
				<canvas ref={chartDvarkxRef} id="canvas_dvarkx"></canvas>
			</div>
			<div className='canvas_wrapper'>
				<canvas ref={chartSigmaxRef} id="canvas_sigmax"></canvas>
			</div>
			<div className='canvas_wrapper'>
				<canvas ref={chartPxRef} id="canvas_px"></canvas>
			</div>
			<div className='canvas_wrapper'>
				<canvas ref={chartTauxRef} id="canvas_taux"></canvas>
			</div>
		</div>
	)

}

export default Charts