		
		var WIDTH = 700;
		var HEIGHT = 490;
		
		function enemyobj(enX, enY, sp){
			this.enX = enX;
			this.enY = enY;
			this.sp = sp;
		}

		var ENEMY = new Array(3);
		ENEMY[0] = new enemyobj(0,0,1);
		ENEMY[1] = new enemyobj(350,0,2);
		ENEMY[2] = new enemyobj(0,490,3);
		
		var MOUSEX = 490;
		var MOUSEY = 350;

		var avatarImage = new Image();
		var enemyImage = new Image();
		avatarImage.src = "img/avatar.png";
		enemyImage.src = "img/enemy.png";

		function Instructions(){
			var gameCanvas = document.getElementById("gameCanvas");
			gameCanvas.width = WIDTH;
			gameCanvas.height = HEIGHT;
			var inst0 = "/* INSTRUCTIONS HERE */ <br> continue to play";
			gameCanvas.getContext("2d").fillText(inst0, 10,20);
		}
		
		function gameBeg() {
		    var gameCanvas = document.getElementById("gameCanvas");
		    gameCanvas.setAttribute("id","gameCanvas1");
		    var playButton = document.getElementById("playButton");
		    playButton.setAttribute("value", "PAUSE");
		    playButton.setAttribute("onclick", "pausefun();");
		    gameCanvas.addEventListener("mousemove" , mouseUpdate);
		    setInterval(gameLoop, 25);
		}

		function pausefun(){
			alert("paused");
		}

		function gameLoop(){
			var gameCanvas = document.getElementById("gameCanvas1");
			var i = 0;

			gameCanvas.width = WIDTH;
			gameCanvas.getContext("2d").drawImage(avatarImage, MOUSEX, MOUSEY);
			
			/*
				if collision code.
			
			*/

			for(i = 0; i<ENEMY.length ; i++){

			//while(i < ENEMY.length){
				if(ENEMY[i].enX > MOUSEX){
					ENEMY[i].enX = ENEMY[i].enX - ENEMY[i].sp;
				}
				else if(ENEMY[i].enX < MOUSEX){
					ENEMY[i].enX = ENEMY[i].enX + ENEMY[i].sp;
				}
				
				if(ENEMY[i].enY > MOUSEY){
					ENEMY[i].enY = ENEMY[i].enY - ENEMY[i].sp;
				}
				else if(ENEMY[i].enY < MOUSEY){
					ENEMY[i].enY = ENEMY[i].enY + ENEMY[i].sp;
				}

				gameCanvas.getContext("2d").drawImage(enemyImage, ENEMY[i].enX , ENEMY[i].enY );
				
				if((ENEMY[i].enX>MOUSEX && ENEMY[i].enX < MOUSEX+30)&&(ENEMY[i].enY < MOUSEY +33 && ENEMY[i].enY>MOUSEY)){
					gameCanvas.style.animation = "alertmessage 1.5s infinite";
					var playButton = document.getElementById("playButton");
					playButton.setAttribute("value", "REPLAY");
					alert("game over , the further parts are underconstruction XD");
					playButton.setAttribute("onclick", "allClearAndBegin();");
				}
				
			}
			if(i === ENEMY.length +1){

			}

		}

		function allClearAndBegin(){

			ENEMY[0].enX = 0;
			ENEMY[0].enY = 0;
			ENEMY[1].enX = 350;
			ENEMY[1].enY = 0;
			ENEMY[2].enX= 700;
			ENEMY[2].enY = 0;
			var gameCanvas = document.getElementById("gameCanvas1");
			gameCanvas.style.animation = "colorchange 1.5s";
			gameCanvas.style.animationFillMode = "forwards";

			var playButton = document.getElementById("playButton");
			gameCanvas.setAttribute("id", "gameCanvas1");
			playButton.setAttribute("value", "PAUSE");
			playButton.setAttribute("onclick", "pausefun();");
		}

		function mouseUpdate(mouseEvent){

			MOUSEX = mouseEvent.offsetX;
			MOUSEY = mouseEvent.offsetY;
			
		}