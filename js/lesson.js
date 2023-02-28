    /* 音程（Interval）
     * 大音程（Major）：大二度（如C-D）、大三度（C-E）、大六度（C-A）、大七度（C-B）
     * 小音程（minor）：小二度（E-F）、小三度（E-G）、小六度（E-C）、小七度（E-D）
     * 增音程（Augmented）：增四度（F-B）
     * 减音程（diminished）：减五度（B-F）
     * 纯音程（Perfect）
     * 全音（Whole Step）：两音之间隔了一个音（不管隔一个黑键还是白键都是隔）
     * 半音（Half Step）：相邻的两个音（大部分是一黑+一白。两个键子之间没有其他键）
     * duration 时值
     * key 
     * Interval
     * whole-tone  全音的
     * chromatic  半音的
     * range 音域(compass)
     * intensity 强度强强度
     * accidental(s) 变音记号
     * complex tone  复音 (composite tone)
     * upgrade 升级条件 [准确率%, 测试数量 ]
     */
    
    let difficulty = {1:{'key':["C"],"duration":[2,4],"range":5,"Interval": 3, "chromatic":false,"intensity":false,"composite_tone":[1],"upgrade":[90,50]},
                      2:{'key':["C"],"duration":[1,4],"range":5,"Interval": 5, "chromatic":false,"intensity":false,"composite_tone":[1],"upgrade":[90,50]},
                      3:{'key':["C","F"],"duration":[1,4],"range":7,"Interval": 7, "chromatic":false,"intensity":false,"composite_tone":[1,2],"upgrade":[90,50]},
                      4:{'key':["C","F","G"],"duration":[1,4],"range":7,"Interval": 7, "chromatic":true,"intensity":false,"composite_tone":[1,2],"upgrade":[90,50]},
                     }
                    
    function randomNumber(min, max) {
        //console.log(min,max)
        return Math.floor(Math.random() * (max - min) + min);
    }                    
                    
    function makeNote(diff, quantity){
        res = "T: difficulty:"+diff+"\n" +
            "M: 4/4\n" +
            "Q: 1/4=60\n" +
            "L: 1/4\n" +
            "R: Let's go\n" +
            "K: "+ difficulty[diff]['key'][Math.floor(Math.random()*difficulty[diff]['key'].length)] +"\n|"  
            startKey = 67 ; // G:67, middle C: 60 
            nowKey = startKey;
            barLine = 0;
        for (var x = 0; x < quantity; x++){
            var composite_tone = Math.ceil(Math.random() * difficulty[diff]['composite_tone'].length);
            if (composite_tone > 1 ){
                res += '[';
            }
            var compositeSet = [];
            var y = 0;
            while (y< composite_tone){
            //for (var y = 0; y< composite_tone; y++){
                nowKey1 = randomNumber(nowKey - difficulty[diff]["Interval"] , nowKey + difficulty[diff]["Interval"]);
                if (difficulty[diff]["chromatic"] == false) {
                    if (KEYMAP[nowKey1][1].includes('#')){
                        nowKey1 = Math.random() >0.5 ?  nowKey1 + 1 :  nowKey1 - 1 ;
                        //if (nowKey1 - Math.min(...compositeSet))
                    }
                }
                //console.log(compositeSet.includes(nowKey1),nowKey1, compositeSet)
                if (compositeSet.includes(nowKey1)== false){
                    res += KEYMAP[nowKey1][2];
                    compositeSet.push(nowKey1);
                    y = y + 1;
                } else {
                    console.log('in compositeSet, remake!')
                    console.log(compositeSet.includes(nowKey1),nowKey1, compositeSet)
                }
            }
            if (composite_tone > 1 ){
                res += ']';
            }
            
            barLine +=1;
            if (barLine == 4){
               barLine = 0;
               res +='|';
               nowKey = startKey;
            }
        }    
        return res;
    }                 