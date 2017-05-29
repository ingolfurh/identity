var vue = new Vue({
	el: '#content',
	created: function() {
		this.allLines = GAMEDATA_LEVELS.levels[0].allLines;
		this.shapes = GAMEDATA_LEVELS.levels[0].shapes;
	},
	data: {
		counter: 0,
		allLines: [],
		shapes: [],
		myLines: [],
		last: {
			X: -1,
			Y: -1,
			spareX: -1,
			spareY: -1,
		},
	},
	methods: {
		chooseLine: function(event) {
			var lineID = event.target.getAttributeNode("id").nodeValue;
			lineID = lineID[lineID.length - 1];

			x1 = event.target.getAttributeNode("x1").nodeValue;
			y1 = event.target.getAttributeNode("y1").nodeValue;
			x2 = event.target.getAttributeNode("x2").nodeValue;
			y2 = event.target.getAttributeNode("y2").nodeValue;
			
			if(this.hasAlreadyBeenClicked(lineID)) {
				return;
			}
			if(this.last.X == -1) {
				// If this is the first line clicked
				this.last.X = x1;
				this.last.Y = y1;
				this.last.spareX = x2;
				this.last.spareY = y2;
				this.addToMyLines(lineID, event);
			}
			else if(this.last.spareX != -1) {
				// If this is the second line clicked
				if((this.last.X == x1 && this.last.Y == y1) || (this.last.spareX == x1 && this.last.spareY == y1)) {
					this.last.spareX = -1;
					this.last.spareY = -1;
					
					this.last.X = x2;
					this.last.Y = y2;
					this.addToMyLines(lineID, event);
				}
				else if ((this.last.X == x2 && this.last.Y == y2) || (this.last.spareX == x2 && this.last.spareY == y2)) {
					this.last.spareX = -1;
					this.last.spareY = -1;
					
					this.last.X = x1;
					this.last.Y = y1;
					this.addToMyLines(lineID, event);
				}
			}
			else {
				// This is a normal line click

				if(this.last.X == x1 && this.last.Y == y1) {
					this.last.X = x2;
					this.last.Y = y2;
					this.addToMyLines(lineID, event);
				}
				else if(this.last.X == x2 && this.last.Y == y2) {
					this.last.X = x1;
					this.last.Y = y1;
					this.addToMyLines(lineID, event);
				}
			}
		},
		hasAlreadyBeenClicked: function(lineID){
			for(iter = 0; iter < this.myLines.length; iter++) {
				if(lineID == this.myLines[iter]) {
					return true;
				}
			}
			return false;
		},
		addToMyLines: function(lineID, event) {
			
			this.myLines.push(lineID);
			
			pathClass = event.target.getAttribute("class");
			event.target.setAttribute("class", "selected");
			
			this.checkForFinishedShape(lineID);
		},
		checkForFinishedShape: function(lineID) {
			var correctShape = false;

			myShape = this.shapes[0].length;
			for (i = 0; i < this.shapes[0].length; i++) {
				if (this.shapes[0][i] == lineID) {
					correctShape = true;
				}
				for (j = 0; j < this.myLines.length; j++) {
					if (this.shapes[0][i] == this.myLines[j]) {
						myShape--;
					}
				}
			}
			if (correctShape && myShape == 0) {
				this.shapes.shift();
			}
			this.checkForFinishedPuzzle();
		},
		checkForFinishedPuzzle: function() {
			if(this.shapes.length == 0) {
				alert("DONE!");
			}
		},
	}
})       