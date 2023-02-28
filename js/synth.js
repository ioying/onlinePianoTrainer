
//  params is a hash of:
//  canvas_id: or paper_id: HTML id to draw in. If not present, then the drawing happens just below the editor.
//  generate_midi: if present, then midi is generated.
//  midi_id: if present, the HTML id to place the midi control. Otherwise it is placed in the same div as the paper.
//  midi_download_id: if present, the HTML id to place the midi download link. Otherwise it is placed in the same div as the paper.
//  generate_warnings: if present, then parser warnings are displayed on the page.
//  warnings_id: if present, the HTML id to place the warnings. Otherwise they are placed in the same div as the paper.
//  onchange: if present, the callback function to call whenever there has been a change.
//  gui: if present, the paper can send changes back to the editor (presumably because the user changed something directly.)
//  parser_options: options to send to the parser engine.
//  midi_options: options to send to the midi engine.
//  render_options: options to send to the render engine.
//  indicate_changed: the dirty flag is set if this is true.
    var abcjsEditor;

    function initEditor(){
      var speedChanged = 0;
      abcjsEditor = new ABCJS.Editor("abc_note", {
        canvas_id: "paper",
        warnings_id: "warnings",
        
        synth: {
            el: "#audio",
            options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true }
        },
        abcjsParams: {
            add_classes: true,
            clickListener: clickListener,
            responsive: "resize",
            },
        selectionChangeCallback: selectionChangeCallback
      })
      load();
      

      document.getElementById("setSpeed").oninput = function() {
          document.getElementById("nowspeed").innerHTML = document.getElementById("setSpeed").value;
          //synthControl.setWarp(document.getElementById("setSpeed").value);
          speedChanged = 1;
      }
      document.getElementById("setSpeed").onclick = function() {
          if (speedChanged == 1) {
            //console.log('setSpeed CLICK')
            synthControl.setWarp(document.getElementById("setSpeed").value);
            speedChanged = 0;
          }
      }
      // 
      document.getElementById("setSpeed").onmouseout = function() {
        if (speedChanged == 1) {
            //console.log('setSpeed mouse out')
            synthControl.setWarp(document.getElementById("setSpeed").value);
            speedChanged = 0;
            }
      }
      //document.getElementById("midi").addEventListener("click", downloadMidi);
    };
    
    
        
    function selectionChangeCallback(start, end) {
      if (abcjsEditor) {
        var el = abcjsEditor.tunes[0].getElementFromChar(start);
        //console.log("selectionChangeCallback", el);
      }
    }

        
        function CursorControl() {
            var self = this;

            self.onReady = function() {
                // 
                //var downloadLink = document.querySelector(".download");
                //downloadLink.addEventListener("click", download);
                //downloadLink.setAttribute("style", "");
                //var clickEl = document.querySelector(".click-explanation")
                //clickEl.setAttribute("style", "");
            };
            self.onStart = function() {
                var svg = document.querySelector("#paper svg");
                var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
                cursor.setAttribute("class", "abcjs-cursor");
                cursor.setAttributeNS(null, 'x1', 0);
                cursor.setAttributeNS(null, 'y1', 0);
                cursor.setAttributeNS(null, 'x2', 0);
                cursor.setAttributeNS(null, 'y2', 0);
                svg.appendChild(cursor);

            };
            self.beatSubdivisions = 2;
            self.onBeat = function(beatNumber, totalBeats, totalTime) {
                if (!self.beatDiv)
                    self.beatDiv = document.querySelector(".beat");
                self.beatDiv.innerText = "Beat: " + beatNumber + " Total: " + totalBeats + " Total time: " + totalTime;
            };
            self.onEvent = function(ev) {
                if (ev.measureStart && ev.left === null)
                    return; // this was the second part of a tie across a measure line. Just ignore it.

                var lastSelection = document.querySelectorAll("#paper svg .highlight");
                //document.getElementById(`${ev.midiPitches[0].pitch}`).classList.add("active");
                showOnkeyBoard(ev.midiPitches,'play');
                //console.log('ev:',ev,ev.midiPitches[0].pitch)
                for (var k = 0; k < lastSelection.length; k++)
                    lastSelection[k].classList.remove("highlight");

                var el = document.querySelector(".feedback").innerHTML = "<div class='label'>Current Note:</div>" + JSON.stringify(ev, null, 4);
                for (var i = 0; i < ev.elements.length; i++ ) {
                    var note = ev.elements[i];
                    for (var j = 0; j < note.length; j++) {
                        note[j].classList.add("highlight");
                    }
                }

                var cursor = document.querySelector("#paper svg .abcjs-cursor");
                if (cursor) {
                    cursor.setAttribute("x1", ev.left - 2);
                    cursor.setAttribute("x2", ev.left - 2);
                    cursor.setAttribute("y1", ev.top);
                    cursor.setAttribute("y2", ev.top + ev.height);
                }
            };
            self.onFinished = function() {
                var els = document.querySelectorAll("svg .highlight");
                for (var i = 0; i < els.length; i++ ) {
                    els[i].classList.remove("highlight");
                }
                var cursor = document.querySelector("#paper svg .abcjs-cursor");
                if (cursor) {
                    cursor.setAttribute("x1", 0);
                    cursor.setAttribute("x2", 0);
                    cursor.setAttribute("y1", 0);
                    cursor.setAttribute("y2", 0);
                }
            };
        }

        var cursorControl = new CursorControl();
        //var abc = document.getElementById("abc_note").value;
        var abcExec = [
            "T: Cooley's\n" +
            "M: 4/4\n" +
            "Q: 1/4=120\n" +
            "L: 1/8\n" +
            "R: reel\n" +
            "K: Emin\n" +
            "|:{E}D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
            "EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
            "|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
            "eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|",

            "X:1\n" +
            "T:Bill Bailey\n" +
            "M:4/4\n" +
            "L:1/4\n" +
            "Q:1/4=210\n" +
            "K:C\n" +
            "\"C\"GA2c|e3/2^d/2eg|GA2c|e4|GA2c|e2g2|\"G7\"(gB3-|B4)|\n" +
            "GB2d|fefg|GB2d|f4|GB2d|g2\"G+\"a2|\"C\"(ae3-|e4)|\n" +
            "GA2c|e3/2^d/2eg|GA2c|e3G|GGce|g2_b2|\"F\"a2-a2-|a3c|\n" +
            "cc2c|\"F#dim7\"d2c2|\"C\"gg2a|\"A7\"e3e|\"D7\"ed^cd|\"G7\"f2e2|\"C\"c4-|czz2|]",

            "X:1\n" +
            "T:All Notes On Piano\n" +
            "M:4/4\n" +
            "Q:120\n" +
            "L:1/4\n" +
            "K:C clef=bass\n" +
            "A,,,,^A,,,,B,,,,C,,,|^C,,,D,,,^D,,,E,,,|F,,,^F,,,G,,,^G,,,|A,,,^A,,,B,,,C,,|\n" +
            "^C,,D,,^D,,E,,|F,,^F,,G,,^G,,|A,,^A,,B,,C,|^C,D,^D,E,|\n" +
            "K:C clef=treble\n" +
            "F,^F,G,^G,|A,^A,B,C|^CD^DE|F^FG^G|\n" +
            "A^ABc|^cd^de|f^fg^g|a^abc'|\n" +
            "^c'd'^d'e'|f'^f'g'^g'|a'^a'b'c''|^c''d''^d''e''|\n" +
            "f''^f''g''^g''|a''^a''b''c'''|^c'''4|]"
        ];

        var tuneNames = [ "Cooleys", "Bill Bailey", "All Notes On Piano" ];

        var currentTune = 0;

        var synthControl;

        function clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent) {
            var output = "currentTrackMilliseconds: " + abcElem.currentTrackMilliseconds + "<br>" +
                "currentTrackWholeNotes: " + abcElem.currentTrackWholeNotes + "<br>" +
                "midiPitches: " + JSON.stringify(abcElem.midiPitches, null, 4) + "<br>" +
                "gracenotes: " + JSON.stringify(abcElem.gracenotes, null, 4) + "<br>" +
                "midiGraceNotePitches: " + JSON.stringify(abcElem.midiGraceNotePitches, null, 4) + "<br>";
            document.querySelector(".clicked-info").innerHTML = "<div class='label'>Clicked info:</div>" +output;
            showOnkeyBoard(abcElem.midiPitches,'click');
            /*
             * selectionChangeCallback(start, end)
             */
            //selectionChangeCallback(abcElem.midiPitches["startChar"], abcElem.midiPitches["endChar"]) 
            var lastClicked = abcElem.midiPitches;
            if (!lastClicked)
                return;

            ABCJS.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, synthControl.visualObj.millisecondsPerMeasure()).then(function (response) {
                /*
                // play midi
                // pl=[{"cmd": "note","pitch": 78,"volume": 95,"start": 28,"duration": 0.125,"instrument": 0,"startChar": 188,"endChar": 189, "gap": 0},{...}]
                // ABCJS.synth.playEvent(pl,undefined,1333)
                */
                //console.log("note played:lastClicked, abcElem.midiGraceNotePitches, synthControl.visualObj.millisecondsPerMeasure() ",lastClicked, abcElem.midiGraceNotePitches, synthControl.visualObj.millisecondsPerMeasure());
            }).catch(function (error) {
                console.log("error playing note", error);
            });
        }

        var abcOptions = {
            add_classes: true,
            clickListener: self.clickListener,
            responsive: "resize"
        };
        
        function playAllNotes(){
            let pl = []
            for (let i = 21; i < 109; i++) {
                pl.push({"cmd": "note","pitch": i,"volume": 0,"start": 28,"duration": 0.001,"instrument": 0,"startChar": 1,"endChar": 2, "gap": 0})
            }
            //console.log(pl)
            ABCJS.synth.playEvent(pl,undefined,1333);
            console.log('allNotesReady');
        }

        function load() {ABCJS.synth.CreateSynth
            document.querySelector(".next").addEventListener("click", next);
            document.querySelector(".start").addEventListener("click", start);
            document.querySelector(".rand").addEventListener("click", rand);
            //document.querySelector(".warp").addEventListener("click", warp);
            //document.querySelector(".seek").addEventListener("click", seek);
            //document.querySelector(".seek2").addEventListener("click", seek2);
            //document.querySelector("#seek-units").addEventListener("change", seekExplanation);

            if (ABCJS.synth.supportsAudio()) {
                synthControl = new ABCJS.synth.SynthController();
                synthControl.load("#audio", cursorControl, {displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true});
            } else {
                document.querySelector("#audio").innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
            }
            setTune(false);
            playAllNotes();
        }

        function download() {
            if (synthControl)
                synthControl.download(tuneNames[currentTune] + ".wav");
        }

        function start() {
            if (synthControl)
                synthControl.play();
        }

        function seek() {
            synthControl.seek(0.50)
        }

        function seekExplanation() {
            var explanation = document.getElementById("unit-explanation");
            if (!synthControl.visualObj.noteTimings) {
                explanation.innerText = "First start playing to load audio before seeking.";
                return;
            }
            var units = this.value;
            var max = 1;
            switch (units) {
                case "seconds":
                    max = synthControl.visualObj.getTotalTime();
                    break;
                case "beats":
                    max = synthControl.visualObj.getTotalBeats();
                    break;
            }
            explanation.innerText = "Enter a number between 0 and {0}.".replace("{0}", max);
        }

        function seek2() {
            var amount = document.getElementById("seek-amount").value;
            var units = document.getElementById("seek-units").value;
            synthControl.seek(amount, units)
        }

        function warp() {
            var el = document.querySelector(".warp");
            el.setAttribute("disabled", true)
            var amount = Math.random()
            //console.log("warp", amount)
            synthControl.setWarp(amount*100).then(function () {
                el.removeAttribute("disabled")
            })
        }

        function setTune(userAction) {
            // var seekControls = document.querySelector(".seek-controls");
            // seekControls.classList.add("disabled");
            // synthControl.disable(true);
            var abc = document.getElementById("abc_note").value;
            //abc[currentTune]
            //var visualObj = ABCJS.renderAbc("paper", abc, abcOptions)[0];
            var visualObj = abcjsEditor.tunes[0];
            var midi = ABCJS.synth.getMidiFile(abc);
            var midiButton = document.querySelector(".midi");
            //console.log('visualObj:', visualObj)
            midiButton.innerHTML = midi;

            // TODO-PER: This will allow the callback function to have access to timing info - this should be incorporated into the render at some point.
            var midiBuffer = new ABCJS.synth.CreateSynth();
            midiBuffer.init({
                //audioContext: new AudioContext(),
                visualObj: visualObj,
                // sequence: [],
                // millisecondsPerMeasure: 1000,
                // debugCallback: function(message) { console.log(message) },
                options: {
                    // soundFontUrl: "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/" ,
                    // sequenceCallback: function(noteMapTracks, callbackContext) { return noteMapTracks; },
                    // callbackContext: this,
                    // onEnded: function(callbackContext),
                    // pan: [ -0.5, 0.5 ]
                }
            }).then(function (response) {
                //console.log("setTune then:", response);
                if (synthControl) {
                    synthControl.setTune(visualObj, userAction).then(function (response) {
                        console.log("Audio successfully loaded.")
                        //seekControls.classList.remove("disabled");
                        //seekExplanation();
                    }).catch(function (error) {
                        console.warn("Audio problem:", error);
                    });
                }
            }).catch(function (error) {
                console.warn("Audio problem:", error);
            });
        }

        function next() {
            currentTune++;
            if (currentTune >= abcExec.length)
                currentTune = 0;
            document.getElementById("abc_note").value = abcExec[currentTune] ;
            initEditor()
            //setTune(true);
        }

        function rand(e,diffff = 1, quantity=8) {
            diffff   = diffSet.value;
            quantity = diffQquantity.value;
            console.log('random',diffff,quantity)
            document.getElementById("abc_note").value = makeNote(diffff,quantity) ;
            initEditor()
            //setTune(true);
        }        
        