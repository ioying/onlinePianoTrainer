// abcnotation C, D, E, F, | G, A, B, C | D E F G | A B c d | e f g a | b c' d' e' | f' g' a' b' |
// webmidi (A0B0) C1D1E1F1G1A1B1~ C7D7E7F7G7A7B7 (C8)  C#1D#1E#1F#1G#1A#1B#1   
//const KEYMAP = {}
//          midi_number:[show_name, midi_identifier, abcnotation]
let KEYMAP1 = {}
      KEYMAP1 = {//0---------------------------
                21:[ "A",    "A0" , "A,,,," ],
                22:[ "A#",   "A#0", "^A,,,,"],
                23:[ "B",    "B0" , "B,,,," ],
                //1---------------------------
                24:[ "C",    "C1" ,  "C,,"  ],
                25:[ "C#",   "C#1",  "^C,," ],
                26:[ "D",    "D1" ,  "D,,"  ],
                27:[ "D#",   "D#1",  "^D,," ],
                28:[ "E",    "E1" ,  "E,,"  ],
                29:[ "F",    "F1" ,  "F,,"  ],
                30:[ "F#",   "F#1",  "^F,," ],
                31:[ "G",    "G1" ,  "G,,"  ],
                32:[ "G#",   "G#1",  "^G,," ],
                33:[ "A",    "A1" ,  "A,,"  ],
                34:[ "A#",   "A#1",  "^A,," ],
                35:[ "B",    "B1" ,  "B,,"  ],
                //2---------------------------
                36:[ "C1",    "C2" ,  "C,,"  ],
                37:[ "C#",   "C#2",  "^C,," ],
                38:[ "D",    "D2" ,  "D,,"  ],
                39:[ "D#",   "D#2",  "^D,," ],
                40:[ "E",    "E2" ,  "E,,"  ],
                41:[ "F",    "F2" ,  "F,,"  ],
                42:[ "F#",   "F#2",  "^F,," ],
                43:[ "G",    "G2" ,  "G,,"  ],
                44:[ "G#",   "G#2",  "^G,," ],
                45:[ "A",    "A2" ,  "A,,"  ],
                46:[ "A#",   "A#2",  "^A,," ],
                47:[ "B",    "B2" ,  "B,,"  ],
                //3---------------------------
                48:[ "C2",    "C3" ,  "C,"   ],
                49:[ "C#",   "C#3",  "^C,"  ],
                50:[ "D",    "D3" ,  "D,"   ],
                51:[ "D#",   "D#3",  "^D,"  ],
                52:[ "E",    "E3" ,  "E,"   ],
                53:[ "F",    "F3" ,  "F,"   ],
                54:[ "F#",   "F#3",  "^F,"  ],
                55:[ "G",    "G3" ,  "G,"   ],
                56:[ "G#",   "G#3",  "^G,"  ],
                57:[ "A",    "A3" ,  "A,"   ],
                58:[ "A#",   "A#3",  "^A,"  ],
                59:[ "B",    "B3" ,  "B,"   ],
                //4---------------------------
                60:[ "C3",    "C4" ,  "C"    ],
                61:[ "C#",   "C#4",  "^C"   ],
                62:[ "D",    "D4" ,  "D"    ],
                63:[ "D#",   "D#4",  "^D"   ],
                64:[ "E",    "E4" ,  "E"    ],
                65:[ "F",    "F4" ,  "F"    ],
                66:[ "F#",   "F#4",  "^F"   ],
                67:[ "G",    "G4" ,  "G"    ],
                68:[ "G#",   "G#4",  "^G"   ],
                69:[ "A",    "A4" ,  "A"    ],
                70:[ "A#",   "A#4",  "^A"   ],
                71:[ "B",    "B4" ,  "B"    ],
                //5---------------------------
                72:[ "C4",    "C5" ,  "c"    ],
                73:[ "C#",   "C#5",  "^c"   ],
                74:[ "D",    "D5" ,  "d"    ],
                75:[ "D#",   "D#5",  "^d"   ],
                76:[ "E",    "E5" ,  "e"    ],
                77:[ "F",    "F5" ,  "f"    ],
                78:[ "F#",   "F#5",  "^f"   ],
                79:[ "G",    "G5" ,  "g"    ],
                80:[ "G#",   "G#5",  "^g"   ],
                81:[ "A",    "A5" ,  "a"    ],
                82:[ "A#",   "A#5",  "^a"   ],
                83:[ "B",    "B5" ,  "b"    ],
                //6---------------------------
                84:[ "C5",    "C6" ,  "c'"    ],
                85:[ "C#",   "C#6",  "^c'"   ],
                86:[ "D",    "D6" ,  "d'"    ],
                87:[ "D#",   "D#6",  "^d'"   ],
                88:[ "E",    "E6" ,  "e'"    ],
                89:[ "F",    "F6" ,  "f'"    ],
                90:[ "F#",   "F#6",  "^f'"   ],
                91:[ "G",    "G6" ,  "g'"    ],
                92:[ "G#",   "G#6",  "^g'"   ],
                93:[ "A",    "A6" ,  "a'"    ],
                94:[ "A#",   "A#6",  "^a'"   ],
                95:[ "B",    "B6" ,  "b'"    ],
                //7---------------------------
                96:[ "C6",    "C7" ,  "c''"    ],
                97:[ "C#",   "C#7",  "^c''"   ],
                98:[ "D",    "D7" ,  "d''"    ],
                99:[ "D#",   "D#7",  "^d''"   ],
               100:[ "E",    "E7" ,  "e''"    ],
               101:[ "F",    "F7" ,  "f''"    ],
               102:[ "F#",   "F#7",  "^f''"   ],
               103:[ "G",    "G7" ,  "g''"    ],
               104:[ "G#",   "G#7",  "^g''"   ],
               105:[ "A",    "A7" ,  "a''"    ],
               106:[ "A#",   "A#7",  "^a''"   ],
               107:[ "B",    "B7" ,  "b''"    ],
               108:[ "C7",    "C8" ,  "c'''"   ]
                }
//const TONES = 12;
//const BASES = {};

function clamp(num) {
    num = num % 12;
    return num < 0 ? num + 12 : num;
}
function midiToTone(midi) {
    return clamp(midi - 36); // 36 = C
}

function nodeOnclick(node){
    console.log(node)
}

//function toString(tone, naming = "english") {
//    const bases = BASES[naming];
//    if (tone in bases) {
//        return bases[tone];
//    }
//    return `${bases[tone - 1]}♯`;
//}

const NATURAL = new Set([0, 2, 4, 5, 7, 9, 11]);
function isNatural(tone) {
    return NATURAL.has(clamp(tone));
}
function playMidi(node, type=''){
    //if (WebMidi.inputs.length < 1) {
    //console.log('playMidi:',node)
    return
    let output = WebMidi.outputs[0];
    if (output === undefined ) {
        console.log('no output')
        return
    } else {
        let channel = output.channels[1];
    }
    if (type == 'play') {
        //channel.playNote(`${node.getAttribute('midi')}`, {attack: 0.5});
    } else {
        //channel.stopNote(`${node.getAttribute('midi')}`);
    }
    //console.log(node)
    return
}
function createKey(midiTone) {
    
    let tone = midiToTone(midiTone);
    let node = document.createElement("li");
    node.classList.add("key");
    if (isNatural(tone)) {
        node.classList.add("white");
    }
    else {
        node.classList.add("black");
    }
    node.setAttribute('id',midiTone);
    node.setAttribute('midi',KEYMAP[midiTone][1]);
    node.setAttribute('abc',KEYMAP[midiTone][2]);
    node.setAttribute('waitped','no');
    node.setAttribute('rawVelocity','0');
    node.textContent = KEYMAP[midiTone][0];
    //node.addEventListener("click", function(){ nodeOnclick(node); });
    
    //node.addEventListener("mousedown", () => {
    //    node.classList.add("active");
    //    console.log('mousedown:',node)
    //    playMidi(node,'play');
    //    //channel.playNote(`${note.midi}`);
    //});
    //node.addEventListener("mouseup", () => {
    //    node.classList.remove("active")
    //    playMidi(node,'stop');
    //})
    //console.log("create", node)
    return node;

}

const MIN = 21;
const MAX = 108;
export default class Keyboard {
    constructor(naming='english') {
        this.keys = new Map();
        this.node = document.createElement("ol");
        this.node.classList.add("keyboard");
        for (let i = MIN; i <= MAX; i++) {
            if (i in KEYMAP){
                let key = createKey(i);
                this.node.appendChild(key);
                this.keys.set(i, key);
                //console.log('key set:',i,key);
            }   
        }
        //this.node.addEventListener("click", this);
        //console.log(this.node);
        //window.addEventListener("keydown", this);
        //window.addEventListener("keyup", this);
        //midi.addEventListener(this);
        //this.naming = naming;
    }  
    //get tones() {
    //    let tones = [];
    //    this.keys.forEach((node, tone) => {
    //        node.classList.contains("active") && tones.push(tone);
    //    });
    //    return tones;
    //}
    //set naming(naming) {
    //    this.keys.forEach((node, midiTone) => {
    //        let tone = midiToTone(midiTone);
    //        //console.log(this.keys);
    //        node.textContent = toString(tone, naming);
    //    });
    //} 
    onChange() { }    
}