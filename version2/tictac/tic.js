var items = new Object();

var start = function(){
	

	var buttons = document.querySelectorAll(".block");
	for(let i=0; i< buttons.length;i++){

		buttons[i].setAttribute("onclick","insertAt("+i+",'+')")

	}


	let element = document.querySelector("#start");
	element.style.backgroundColor = "#dc685a";

	
	aiPlayer = new ai(ai.level);
	items.game = new game(aiPlayer);

	aiPlayer.plays(items.game);

	items.game.start();

	var menu = document.querySelector("#mn");
	menu.style.display = "none";
}


//
//
//  Function related to UI
//


function humanMove(elementid){

	var element = document.querySelector("#"+elementid);
	element.style.backgroundColor = "#dc685a";
	element.style.color = "white";
	element.innerHTML = "+";
	if(screen.width > 450)
		element.style.fontSize = "120px";
	else
		element.style.fontSize = "80px"; 
	element.style.textAlign= "center";
	element.className += " clicked";
	element.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)";

	if(items.game.status === "running" && items.game.currentState.turn === "+") {
             var indx = parseInt(element.id[1]*1-1);

             var next = new State(items.game.currentState);
             next.board[indx] = "+";
             console.log(next.board);

             next.nextTurn();

             items.game.advanceTo(next);

         }

};

function aiMove(elementid){

	var element = document.querySelector("#"+elementid);
	element.style.backgroundColor = "#ecaf4f";
	element.style.color = "white";
	element.innerHTML = "-";
	if(screen.width > 450)
		element.style.fontSize = "120px";
	else
		element.style.fontSize = "80px"; 
	element.style.textAlign= "center";
	element.className += " clicked";
	element.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)";

};



function insertAt(index, symbol){
	
	var element = document.querySelector("#_"+(parseInt(index) +1));
	if(!element.classList.contains('clicked')){
		if(symbol == '+')
			humanMove(element.id);
		else
			aiMove(element.id);
	}


}



function setLevel(level){

	ai.level = level == undefined?"hard":level;

	var element  = document.querySelectorAll('.btn');
	for(var i=0; i<element.length ;i++){
		if(element[i].classList.contains(level))
			element[i].style.backgroundColor = "#ecaf4f";
		else
			element[i].style.backgroundColor = "#1976D2";
	}

	console.log(ai.level);
}




//
//
//   Functions realted to AI
//   Implements minimax algorithm
//




function State(old){

	this.turn = "";
	this.mcount = 0;
	this.result = "running";
	this.board = [];

	if(old !== undefined){

		let length = old.board.length;
		this.board = new Array(length);

		for( var i = 0; i < length; i++ ){
			this.board[i] = old.board[i];
		}

		this.mcount = old.mcount;
		this.result = old.result;
        this.turn = old.turn;

        this.nextTurn = function(){
        	this.turn = this.turn === '+'?'-':"+";
        };

	};

	this.emptyCells = function() {
	        var index = [];
	        for(let i = 0; i < 9 ; i++) {
	            if(this.board[i] === "E") {
	                index.push(i);
	            }
	        }
	        return index;
    	};

	this.isDone = function(){
    		var b = this.board;


    		for( let i = 0; i<=6;i = i+3){
    			if(b[i] !== 'E' && b[i] == b[i+1] && b[i+1] == b[i+2]){
    				this.result = b[i]  +" row" +"won";
    				return true;
    			}
    		}
			for(let i=0; i<3;i++){
				if(b[i] !== 'E' && b[i]==b[i+3] && b[i+3] == b[i+6]){
					this.result = b[i] + "col"+"won";
					return true;
				}
			
			} // Latest bug fixed : Signed by crater


    		for(let i = 0, j = 4; i <= 2; i = i+2, j = j-2 ){
    			if(b[i] !== 'E' && b[i] == b[i+j] && b[i+j] == b[i+2*j] ){
    				this.result = b[i] + "daigonal" + "won";
    				return true;
    			}
			}

			let draw = this.emptyCells();

			if(draw.length == 0){
				this.result = "draw";
				return true;
			}
			else{
				return false;
			}


		}
};




function ai(level) {

	this.level = level;
	var game = {};

	this.plays = function(_game){
		game = _game;
	}

	function hardMove(turn) {

    var available = game.currentState.emptyCells();


    var availableActions = available.map(function(pos) {
        var action =  new aiAction(pos); 

        
        var next = action.applyTo(game.currentState);

        
        action.minimaxVal = minimaxValue(next);

        return action;
    });

    
    if(turn === "+")
        
        availableActions.sort(aiAction.DESCENDING);
    else
        
        availableActions.sort(aiAction.ASCENDING);


    
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    
    insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
}



	function medMove(turn) {

	    var available = game.currentState.emptyCells();

	    
	    var availableActions = available.map(function(pos) {
	        var action =  new aiAction(pos); 

	        
	        var nextState = action.applyTo(game.currentState);

	        
	        action.minimaxVal = minimaxValue(nextState);

	        return action;
	    });

	    
	    if(turn === "+")
	        
	        availableActions.sort(aiAction.DESCENDING);
	    else
	        
	        availableActions.sort(aiAction.ASCENDING);

	    var chosenAction;
	    if(Math.random()*100 <= 40) {
	        chosenAction = availableActions[0];
	    }
	    else {
	        if(availableActions.length >= 2) {
	            
	            chosenAction = availableActions[1];
	        }
	        else {
	            
	            chosenAction = availableActions[0];
	        }
	    }
	    var next = chosenAction.applyTo(game.currentState);

	    insertAt(chosenAction.movePosition, turn);

	    game.advanceTo(next);
	};



	function easyMove(turn) {

	    var available = game.currentState.emptyCells();
	    var randomCell = available[Math.floor(Math.random() * available.length)];
	    var action = new aiAction(randomCell);

	    var next = action.applyTo(game.currentState);

	    insertAt(randomCell, turn);

	    game.advanceTo(next);
	}


	function minimaxValue(state) {

		if(state.isDone()) {
		    
		    return game.score(state);
		}
		else {
		    var stateScore; 

		    if(state.turn === "+")
		        stateScore = -10;
		    else
		    
		        stateScore = 10;

		    var availablePositions = state.emptyCells();

		    
		    var availableNextStates = availablePositions.map(function(pos) {
		        var action = new aiAction(pos);

		        var nextState = action.applyTo(state);

		        return nextState;
		    });

		    availableNextStates.forEach(function(nextState) {

		        var nextScore = minimaxValue(nextState); 

		        if(state.turn === "+") {
		            
		            if(nextScore > stateScore)
		                stateScore = nextScore;
		            }
		        else {
		            
		            if(nextScore < stateScore)
		                stateScore = nextScore;
		        }
		    });

		   
		    return stateScore;
		}
};


	this.alert = function(turn){
		console.log(ai.level);
		switch(level){
			case "easy": easyMove(turn);break;
			case "med":  medMove(turn);break;
			case "hard": hardMove(turn);break;
			default:  hardMove(turn);break;
		}
	};
};


var aiAction = function(pos){

	this.movePosition = pos;
	this.minimaxValue = 0;

	this.applyTo = function(state){
		var next = new State(state);


		next.board[this.movePosition] = state.turn;

		if(state.turn == "+")
			next.mcount++;

		next.nextTurn();

		return next;
	}
}




aiAction.ASCENDING = function(firstAction, secondAction) {

    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1;
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1;
    else
        return 0;
}

aiAction.DESCENDING = function(firstAction, secondAction) {

    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1;
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1;
    else
        return 0;
}




function game(autoPlayer){

	this.ai = autoPlayer;
	this.currentState = new State();
	this.currentState.board = new Array('E','E','E','E','E','E','E','E','E');

	this.currentState.turn = '+';
	this.status = "beginning";

	this.advanceTo = function(state){
		this.currentState = state;
		if(state.isDone()){
			this.status = "ended";
			if(state.result[0] == "+"){
				var ele = document.querySelector(".last");
				let c = document.querySelector("#msg");
				c.innerHTML="You won. Well done <br><br><br> Up for another??";
				ele.style.display = "block";

				var closebtn = document.querySelector("#close");
				closebtn.onclick = function(){
					var ele = document.querySelector(".last");
					console.log(ele);
					ele.style.display = "none";
				}
			}
			else if(state.result[0] == "-"){
				//ai 
				var ele = document.querySelector(".last");
				let c = document.querySelector("#msg");
				c.innerHTML="AI won.Not so tough are you? <br><br><br> Up for another??";
				ele.style.display = "block";
				var closebtn = document.querySelector("#close");
				closebtn.onclick = function(){
					var ele = document.querySelector(".last");
					console.log(ele);
					ele.style.display = "none";
				}
			}

			else{
				var ele = document.querySelector(".last");
				let c = document.querySelector("#msg");
				c.innerHTML="The game ended in a draw <br><br><br> Up for another??";
				ele.style.display = "block";
				var closebtn = document.querySelector("#close");
				closebtn.onclick = function(){
					var ele = document.querySelector(".last");
					console.log(ele);
					ele.style.display = "none";
				}

		}
	}

		else{
			if(this.currentState.turn === "+") {
                //Humans turn to play: Need to add recommeder system here ==== crater
            }
            else {
                //play ai
                this.ai.alert("-");
            }
		}
	};

	this.start = function() {
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    };


	this.score = function(_state) {

	    if(_state.result !== "running") {
	        if(_state.result[0] === "+"){
	            // the + player won
	            return 10 - _state.mcount;
	        }
	        else if(_state.result[0] === "-") {
	            //the + player lost
	            return -10 + _state.mcount;
	        }
	        else {
	            //it's a draw
	            return 0;
	        }
	    }
	};

};








