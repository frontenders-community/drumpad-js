const DATA = [
    {
      name: "yamaha-rm50-clap",
      type: "clap",
    },
    {
      name: "yamaha-rm50-closed-hi-hat-1",
      type: "hi-hat",
    },
    {
      name: "yamaha-rm50-closed-hi-hat-2",
      type: "hi-hat",
    },
    {
      name: "yamaha-rm50-cowbell-1",
      type: "cowbell",
    },
    {
      name: "yamaha-rm50-cowbell-2",
      type: "cowbell",
    },
    {
      name: "yamaha-rm50-crash-cymbal-1",
      type: "crash",
    },
    {
      name: "yamaha-rm50-crash-cymbal-2",
      type: "crash",
    },
    {
      name: "yamaha-rm50-crash-cymbal-3",
      type: "crash",
    },
    {
      name: "yamaha-rm50-low-bongo",
      type: "low",
    },
    {
      name: "yamaha-rm50-low-tom-1",
      type: "low",
    },
    {
      name: "yamaha-rm50-low-tom-2",
      type: "low",
    },
    {
      name: "yamaha-rm50-rock-kick-1",
      type: "kick",
    },
    {
      name: "yamaha-rm50-rock-kick-2",
      type: "kick",
    },
    {
      name: "yamaha-rm50-studio-kick-1",
      type: "kick",
    },
    {
      name: "yamaha-rm50-pedal-hi-hat-1",
      type: "hi-hat",
    },
    {
      name: "yamaha-rm50-splash-cymbal",
      type: "crash",
    },
];
const COLORS = ["blue", "green", "yellow", "orange", "red", "purple", "silver"];
const TYPES_BY_COLORS = {};

const drumpad = document.querySelector('.drumpad');
const recordBtn = document.querySelector('#record');
const playBtn = document.querySelector('#play');
const stopBtn = document.querySelector('#stop');
const controlLabel = document.querySelector('#control-label');

let isRecording = false;
let sequence = [];

recordBtn.addEventListener("click", function() {
  isRecording = true;
  changeControlLabel("Sto registrando");
});

playBtn.addEventListener("click", function() {
  if (sequence.length > 0) {
    playSequence();
    changeControlLabel("Riproduco sequenza");
  } else {
    changeControlLabel("Nessuna sequenza trovata");
  }
});

stopBtn.addEventListener("click", function() {
  if (isRecording) {
    isRecording = false;
    changeControlLabel("Sequenza terminata");
  }
});

function changeControlLabel(newLabel) {
  controlLabel.innerText = newLabel;
}

function playSequence() {
  let timeout = 0;
  sequence.forEach(audio => {
    setTimeout(() => {
      console.log(`Playing audio ${audio}`)
      playAudio(audio);
    }, timeout)
    timeout += 1000;
  });
}

function bindTypesToColors() {
    const indexes = [];
    for (let i = 0; i < DATA.length; i++) {
        if (!TYPES_BY_COLORS.hasOwnProperty(DATA[i].type)) {
            const type = DATA[i].type;
            let randomIndex = Math.floor(Math.random()*COLORS.length);
            while (indexes.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random()*COLORS.length);
            }
            indexes.push(randomIndex);
            TYPES_BY_COLORS[type] = COLORS[randomIndex];
        }
    }
}

function createDrumpadItem(name, color) {
    const newItem = document.createElement("div");
    newItem.id = name;
    newItem.classList.add("drumpad-item");
    newItem.style = `background-image: radial-gradient(
        rgba(var(--${color}), 1),
        rgba(var(--${color}), 0.6)
    )`;
    drumpad.appendChild(newItem);
    return newItem;
}

function playAudio(name) {
  const audio = new Audio(`../assets/sounds/${name}.webm`);
  audio.play();
}

function createDrumpad() {
    bindTypesToColors();
    DATA.forEach(element => {
        const { type, name } = element;
        const color = TYPES_BY_COLORS[type];

        const newItem = createDrumpadItem(name, color);
        newItem.addEventListener("click", function() {
            playAudio(this.id);

            if (isRecording) {
              sequence.push(this.id);
            }
        });
    });
}

createDrumpad();