
window.a=3;
window.pic=0;
window.flag=0;
window.ii1=0;
window.ii2=0;
window.ii3=0;
window.ii4=0;
window.ii5=0;
window.imgflag=0;
        function i1()
        {
            
			window.pic=1;
			window.ii1++;
			window.p="1.jpeg";
			window.imgflag++;
			var img1=document.getElementById("fimg");
			if(window.ii1%2!=0 && window.imgflag%2!=0)
			{
			
			
			img1.style.width="260px";
			img1.style.height="150px";
			img1.style.marginLeft="-30px";
			img1.style.marginTop="-15px";
			}
			else
			{
			img1.style.width="200px";
			img1.style.height="120px";
			img1.style.marginLeft="0px";
			img1.style.marginTop="0px";
			}
			
			
        }

        function i2()
        {
            
			window.pic=2;	
			window.ii2++;
			window.p="2.jpg";
			window.imgflag++;
			var img1=document.getElementById("simg");
			if(window.ii2%2!=0 && window.imgflag%2!=0)
			{
			
			
			img1.style.width="260px";
			img1.style.height="150px";
			img1.style.marginLeft="-30px";
			img1.style.marginTop="-15px";
			}
			else
			{
			img1.style.width="200px";
			img1.style.height="120px";
			img1.style.marginLeft="0px";
			img1.style.marginTop="0px";
			}
        }

        function i3()
        {
			window.ii3++;
			window.pic=3;
			window.p="3.jpg"
			window.imgflag++;
			var img1=document.getElementById("timg");
			if(window.ii3%2!=0 && window.imgflag%2!=0)
			{
			
			
			img1.style.width="260px";
			img1.style.height="150px";
			img1.style.marginLeft="-30px";
			img1.style.marginTop="-15px";
			}
			else
			{
			img1.style.width="200px";
			img1.style.height="120px";
			img1.style.marginLeft="0px";
			img1.style.marginTop="0px";
			}
        }

        function i4()
        {
			window.ii4++;
			window.pic=4;
			window.p="4.jpg";
			window.imgflag++;
			var img1=document.getElementById("foimg");
			if(window.ii4%2!=0 && window.imgflag%2!=0)
			{
			
		
			img1.style.width="260px";
			img1.style.height="150px";
			img1.style.marginLeft="-30px";
			img1.style.marginTop="-15px";
			}
			else
			{
			img1.style.width="200px";
			img1.style.height="120px";
			img1.style.marginLeft="0px";
			img1.style.marginTop="0px";
			}
        }

        function i5()
        {
            window.p="5.jpg";
			window.pic=5;
			window.ii5++;
			window.imgflag++;	
			var img1=document.getElementById("fiimg");
			if(window.ii5%2!=0 && window.imgflag%2!=0)
			{
			
			img1.style.width="260px";
			img1.style.height="150px";
			img1.style.marginLeft="-30px";
			img1.style.marginTop="-15px";
			}
			else
			{
			img1.style.width="200px";
			img1.style.height="120px";
			img1.style.marginLeft="0px";
			img1.style.marginTop="0px";
			}
		}

        function sethard(e){
		   window.a=e.value;
		   
           setvar();
        }
		
		
		
        function setvar()
        {
		
		
		
        console.log(a);

        window.PUZZLEDIFFICULTY = window.a;
        window.PUZZLEHOVERTINT = '#f4f141  ';

        window.stage;
        window.canvas;

        window.img;
        window.pieces;
        window.puzzleWidth;
        window.puzzleHeight;
        window.pieceWidth;
        window.pieceHeight;
        window.currentPiece;
        window.currentDropPiece;  

        window.mouse;
		
		init();
        }
		
		
        function init(){
			var menu=document.getElementById("menu");
			menu.style.display="block";
			var i=0;
			if(window.flag==0)
			{
			while(i<4)
			{
            document.body.removeChild(document.body.children[0]);
			i++;
			}
			}
			
            console.log(PUZZLEDIFFICULTY);
            img = new Image();
            img.addEventListener('load',onImage,false);
            img.src = p;
            window.flag=1;
        }
        function onImage(e){
            pieceWidth = Math.floor(img.width / PUZZLEDIFFICULTY)
            pieceHeight = Math.floor(img.height / PUZZLEDIFFICULTY)
            puzzleWidth = pieceWidth * PUZZLEDIFFICULTY;
            puzzleHeight = pieceHeight * PUZZLEDIFFICULTY;
            setCanvas();
            initPuzzle();
        }
        function setCanvas(){
            canvas = document.getElementById('canvas');
            stage = canvas.getContext('2d');
            canvas.width = puzzleWidth;
            canvas.height = puzzleHeight;
            canvas.style.border = "1px solid black";
        }
        function initPuzzle(){
            pieces = [];
            mouse = {x:0,y:0};
            currentPiece = null;
            currentDropPiece = null;
            //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            stage.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
            createTitle("Click to Start Puzzle");
            buildPieces();
        }
        function createTitle(msg){
            stage.fillStyle = "#000000";
            stage.globalAlpha = .4;
            stage.fillRect(100,puzzleHeight - 40,puzzleWidth - 200,40);
            stage.fillStyle = "#FFFFFF";
            stage.globalAlpha = 1;
            stage.textAlign = "center";
            stage.textBaseline = "middle";
            stage.font = "20px Arial";
            stage.fillText(msg,puzzleWidth / 2,puzzleHeight - 20);
			
        }
        function buildPieces(){
            var i;
            var piece;
            var xPos = 0;
            var yPos = 0;
            for(i = 0;i < PUZZLEDIFFICULTY * PUZZLEDIFFICULTY;i++){
                piece = {};
                piece.sx = xPos;
                piece.sy = yPos;
                pieces.push(piece);
                xPos += pieceWidth;
                if(xPos >= puzzleWidth){
                    xPos = 0;
                    yPos += pieceHeight;
                }
            }
            document.onmousedown = shufflePuzzle;
        }
        function shufflePuzzle(){
            pieces = shuffleArray(pieces);
            stage.clearRect(0,0,puzzleWidth,puzzleHeight);
            var i;
            var piece;
            var xPos = 0;
            var yPos = 0;
            for(i = 0;i < pieces.length;i++){
                piece = pieces[i];
                piece.xPos = xPos;
                piece.yPos = yPos;
				/*just changing x-distance and y distance from last value of piece.sx and piece.sy*/
                stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
                //draw rect
                stage.strokeRect(xPos, yPos, pieceWidth,pieceHeight);
                xPos += pieceWidth;
                if(xPos >= puzzleWidth){
                    xPos = 0;
                    yPos += pieceHeight;
                }
            }
			
			var bt=document.createElement("input");
			bt.type="button";
			bt.value="View Pic";
			bt.className="buttonclass";
			document.body.appendChild(bt);
			bt.addEventListener('mouseover',viewfunc,false);
			bt.addEventListener('mouseout',hidefunc,false);
            document.onmousedown = onPuzzleClick;
			
			var res1=document.getElementById("res");
			res1.style.display="block";
		}
		
		
        function viewfunc()
		{
			var pl=document.getElementById("viewp");
			
			pl.className="viewpicclass";
			pl.style.display="block";
			if(window.pic==1)
			{
				pl.innerHTML='<img src="1.jpeg" border="5px solid black" >';
				pl.className="viewpicclass1";
			}
			else if(window.pic==2)
			{
				pl.innerHTML='<img src="2.jpg" border="5px solid black" >';
				pl.className="viewpicclass2";
			}
			else if(window.pic==3)
			{
				pl.innerHTML='<img src="3.jpg" border="5px solid black">';
				pl.className="viewpicclass3";
			}
			else if(window.pic==4)
			{
				pl.innerHTML='<img src="4.jpg" border="5px solid black">';
				pl.className="viewpicclass4";
			}
			else if(window.pic==5)
			{
				pl.innerHTML='<img src="5.jpg" border="5px solid black">';
				pl.className="viewpicclass5";
			}
			console.log(window.p);
			
		}
		
		function hidefunc()
		{
			var pl=document.getElementById("viewp");
			pl.className="hidepicclass";
			pl.style.display="none";

		}
		
		
        function onPuzzleClick(e){
        
        //layerX : starts from window
        //offset : starts from the image
            
            mouse.x = e.layerX - canvas.offsetLeft;
            mouse.y = e.layerY - canvas.offsetTop;
            
            currentPiece = checkPieceClicked();
            if(currentPiece != null){
                stage.clearRect(currentPiece.xPos,currentPiece.yPos,pieceWidth,pieceHeight);
                stage.save();
                stage.globalAlpha = .9;
                stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
                stage.restore();
                document.onmousemove = updatePuzzle;
                document.onmouseup = pieceDropped;
            }
        }
        function checkPieceClicked(){
            var i;
            var piece;
            for(i = 0;i < pieces.length;i++){
                piece = pieces[i];
                if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
                    //PIECE NOT HIT
                }
                else{
                    return piece;
                }
            }
            return null;
        }
        function updatePuzzle(e){
            currentDropPiece = null;
           
             //layerX : starts from window
            //offset : starts from the image
            mouse.x = e.layerX - canvas.offsetLeft;
            mouse.y = e.layerY - canvas.offsetTop;
            
            stage.clearRect(0,0,puzzleWidth,puzzleHeight);
            var i;
            var piece;
            for(i = 0;i < pieces.length;i++){
                piece = pieces[i];
                if(piece == currentPiece)// currentPiece contains the clicked piece
				{
                    continue;// dont draw the clicked piece onto canvas
                }
                stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
                stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
                if(currentDropPiece == null)// tile not moving outside the same tile
				{
                    if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
                        //NOT OVER
                    }
                    else{
						// the tile in which the current tile is in
                        currentDropPiece = piece;
						//.save() saves the entire state of the canvas by pushing the current state onto a stack.
                        stage.save();
                        stage.globalAlpha = .4;
                        stage.fillStyle = PUZZLEHOVERTINT;
                        stage.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,pieceWidth, pieceHeight);
						//restore() Pops the top state on the stack, restoring the context to that state.
                        stage.restore();
                    }
                }
            }
			//the tile that is moving
            stage.save();
            stage.globalAlpha = .6;
            stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
            stage.restore();
            stage.strokeRect( mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth,pieceHeight);
        }
        function pieceDropped(e){
            document.onmousemove = null;
            document.onmouseup = null;
            if(currentDropPiece != null){
                var tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
				//interchange x and y positions of tile 1 and tile 2
                currentPiece.xPos = currentDropPiece.xPos;
                currentPiece.yPos = currentDropPiece.yPos;
                currentDropPiece.xPos = tmp.xPos;
                currentDropPiece.yPos = tmp.yPos;
            }
            resetPuzzleAndCheckWin();
        }
        function resetPuzzleAndCheckWin(){
            stage.clearRect(0,0,puzzleWidth,puzzleHeight);
            var gameWin = true;
            var i;
            var piece;
            for(i = 0;i < pieces.length;i++){
                piece = pieces[i];
                stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
                stage.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
                //piece.sx is the actual x position of piece
                if(piece.xPos != piece.sx || piece.yPos != piece.sy){
                    gameWin = false;
                }
            }
            if(gameWin){
                setTimeout(gameOver,500);
            }
        }
        function gameOver(){
            document.onmousedown = null;
            document.onmousemove = null;
            document.onmouseup = null;
            initPuzzle();
			//console.log("you won");
			//alert("You won");
        }
        function shuffleArray(o){
            //console.log(o.length);
            //for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            for(var i=o.length;i>0;i--)
			{
				var j,x;
				j=parseInt(Math.random()*i);
				x=o[--i];
				o[i]=o[j];
				o[j]=x;
			}
            return o;
        }
/*
shuffleArray //done
update
*/