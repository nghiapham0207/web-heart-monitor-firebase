import { MIN_BEAT, MAX_BEAT } from './constants.js';
import { showToastMessage, closeToastMessage } from './toast-message.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDqBiAD8vsNzs3GEgByzFYHgD-6wiYuwUE",
	authDomain: "nodemcu-91ce2.firebaseapp.com",
	databaseURL: "https://nodemcu-91ce2-default-rtdb.firebaseio.com",
	projectId: "nodemcu-91ce2",
	storageBucket: "nodemcu-91ce2.appspot.com",
	messagingSenderId: "144051740039",
	appId: "1:144051740039:web:cf4cb6c61cdf00958a8722",
	measurementId: "G-833XTTPVHV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const starCountRef = ref(db, 'data');

function setValueMonitor(beatValue) {
	var str = '';
	str = `Nhịp tim: ${beatValue} BPM`;
	document.getElementById('chartText').innerText = str;
	console.log(document.getElementById('chartText'));
}

var Beat = {
	value: 0,
	getValue() {
		onValue(starCountRef, (snapshot) => {
			const beatValue = snapshot.val();
			Beat.value = beatValue;
			setValueMonitor(beatValue);
			console.log('gọi hàm');
			if (beatValue > 100) {
				showToastMessage('toast2', 'Nhịp tim cao hơn mức bình thường!');
			} else if (beatValue < 60) {
				showToastMessage('toast2', 'Nhịp tim thấp hơn mức bình thường!');
			} else {
				closeToastMessage('toast2');
			}

		});
		return Beat.value;
	}
}

//<![CDATA[
function updateGauge(id, min, max, GaugeDisplayValue) {
	if (GaugeDisplayValue < min)
		GaugeDisplayValue = min
	if (GaugeDisplayValue > max)
		GaugeDisplayValue = max
	const newGaugeValue = Math.floor(((GaugeDisplayValue - min) / (max - min)) * 100);
	document.getElementById(id).style.setProperty('--gauge-display-value', GaugeDisplayValue);
	document.getElementById(id).style.setProperty('--gauge-value', newGaugeValue);
	if (GaugeDisplayValue > 100) {
		document.getElementById('beat-value').style.setProperty('--gauge-color', 'red')
	} else {
		document.getElementById('beat-value').style.setProperty('--gauge-color', 'white')
	}
	// console.log('--gauge-display-value', GaugeDisplayValue);
	// console.log('--gauge-value', newGaugeValue);
}
//]]>

onValue(starCountRef, (snapshot) => {
	const beatValue = snapshot.val();
	Beat.value = beatValue;
	updateGauge('demoGauge', MIN_BEAT, MAX_BEAT, beatValue);
	if (beatValue > 100) {
		showToastMessage('toast1', 'Nhịp tim cao hơn mức bình thường!');
	} else if (beatValue < 60) {
		showToastMessage('toast1', 'Nhịp tim thấp hơn mức bình thường!');
	} else {
		closeToastMessage('toast1');
	}
});
// setInterval(() => {
// 	updateGauge('demoGauge', MIN_BEAT, MAX_BEAT, Math.floor(Math.random() * (MAX_BEAT - MIN_BEAT)) + MIN_BEAT);
// }, 500);
export { Beat };

function setToolTipGauge(min, max) {
	document.getElementById('ticks').title = `Nhịp tim có giá trị từ ${min} - ${max} bpm`;
}
setToolTipGauge(MIN_BEAT, MAX_BEAT)