var mytimer;
var startTimes = 0;
var isfinished = false;

function showFinish() {
    isfinished = true;
    clearTimeout(mytimer); //停止计时器
    var dialog = document.getElementById("FinishDialog");
    // 显示对话框
    dialog.showModal();
}

function showOver() {
    var dialog = document.getElementById("OverDialog");
    // 显示对话框
    dialog.showModal();
}


function stopTimer() {
    clearTimeout(mytimer); //停止计时器
    console.log('timer stopped');
}

var SG_Hooks = {
    debug : true,
    
	getLanguage : function( supportedLanguages ){
		return SG.initLangs(supportedLanguages);
	},
	
	start : function(){
        SG_Hooks.debug && console.log('game started');
        SG.trigger({type:'start'});

        var bgMusic = document.getElementById("bgMusic");
        bgMusic.play();

        if ( startTimes > 0) {
            mytimer = setTimeout(showFinish, 41000);
            console.log('timer start: ' + mytimer);
        }
        startTimes++;

        isfinished = false;

	},
	
	levelUp : function( level, score, callback){
        SG_Hooks.debug && console.log('level up:' + level + '/' + score);
		SG.trigger({type:'levelUp', level:level, lastLevelScore:score}, callback);
	},
	
	gameOver : function( level, score, callback){
        // stopTimer();

        SG_Hooks.debug && console.log('game over:' + level + '/' + score);
		SG.trigger({type:'gameOver', score:score}, callback);
        // Play68.setRankingScoreDesc(score);
        // updateShare(score);
        console.log('timer stop: ' + mytimer);
        stopTimer()
        if (!isfinished) {
            showOver();
        }

	},
	
    gameCompleted : function( score, callback ){
        SG_Hooks.debug && console.log('game completed:' + score);
        SG.trigger({type:'gameCompleted', score:score}, callback);
    },
    
    gamePause : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('game pause:' + state);
        SG.trigger({type:'gamePause', state:state}, callback);
    },
    
    gameRestart : function( callback ){
        SG_Hooks.debug && console.log('game restart:');
        SG.trigger({type:'gameRestart'}, callback);
    },
    
    selectMainMenu : function(callback){
        SG_Hooks.debug && console.log('selectMainMenu:');
        SG.trigger({type:'selectMainMenu'}, callback);
    },
    
    selectLevel : function( level, callback ){
        SG_Hooks.debug && console.log('selectLevel:'+level);
        SG.trigger({type:'selectLevel', level:level}, callback);
    },
    
    setSound : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('setSound:'+state);
        SG.trigger({type:'gameCompleted', state:state}, callback);
    },
    
    setOrientationHandler : function( f ){
		SG.setOrientationHandler( f );
	},
	
	setResizeHandler: function ( f ){
		SG.setResizeHandler(f);
	}
};
