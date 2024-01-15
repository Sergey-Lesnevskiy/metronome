import Timer from './timer.js'

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo_text');
const decreaseTempoBtn = document.querySelector('.decrease_tempo');
const increaseTempoBtn = document.querySelector('.increase_tempo');
const tempoSlider = document.querySelector('.slider');
const startSliderBtn = document.querySelector('.start_stop');
const subtractBeats = document.querySelector('.subtract_beats');
const addBeats = document.querySelector('.add_beats');
const measureCount = document.querySelector('.measure_count');

const click1 = new Audio('click1.mp3')
const click2 = new Audio('click2.mp3')


let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';

decreaseTempoBtn.addEventListener('click',()=>{
  if(bpm <= 20 ){return}
  bpm--;
  updateMetronome();
});

increaseTempoBtn.addEventListener('click',()=>{
  if(bpm >= 280 ){return}
  bpm++;
  updateMetronome();
});

tempoSlider.addEventListener('input',()=>{
  bpm = tempoSlider.value;
  validateTempo()
  updateMetronome();
});
subtractBeats.addEventListener('click',()=>{
  if(beatsPerMeasure<=2){return}
  beatsPerMeasure--;
  measureCount.textContent = beatsPerMeasure;
  count = 0;
})
addBeats.addEventListener('click',()=>{
  if(beatsPerMeasure>=12){return}
  beatsPerMeasure++;
  measureCount.textContent = beatsPerMeasure;
  count = 0;
})

startSliderBtn.addEventListener('click',()=>{
  count = 0;
  if(!isRunning){
    metronome.start();
    isRunning = true;
    startSliderBtn.textContent = 'STOP';
  }else{
    metronome.stop();
    isRunning = false;
    startSliderBtn.textContent = 'START';
  }
})

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm;
  if(bpm <= 40){tempoTextString = "Super Slow"};
  if(bpm > 40 && bpm <= 80){tempoTextString = "Slow"};
  if(bpm > 80 && bpm <= 120){tempoTextString = "Getting there"};
  if(bpm > 120 && bpm <= 180){tempoTextString = "Nice and Steady"};
  if(bpm > 180 && bpm <= 220){tempoTextString = "Rock n' Roll"};
  if(bpm > 220 && bpm <= 240){tempoTextString = "Funky Stuff"};
  if(bpm > 240 && bpm <= 260){tempoTextString = "Relax Dude"};
  if(bpm > 260 && bpm <= 280){tempoTextString = "Eddie Van Halen"};

  tempoText.textContent = tempoTextString;
}

function validateTempo () {
  if(bpm <= 20 ){return}
  if(bpm >= 280 ){return}
}
function playClick() {
  if(count === beatsPerMeasure){
    count = 0;
  }
  if(count === 0){
    click1.play();
    click1.currentTime = 0;
  }else{
    click2.play();
    click2.currentTime = 0;
  }
  count++;
}

const metronome = new Timer(playClick, 60000 / bpm, {immediate: true});
// metronome.start();