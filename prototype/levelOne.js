var example1 = new Vue({
  el: '#content',
  data: {
    counter: 0,
	allLines: [
		{
			x1: 10,
			y1: 10,
			x2: 110,
			y2: 110,
		},
		{
			x1: 10,
			y1: 10,
			x2: 210,
			y2: 10,
		},
		{
			x1: 10,
			y1: 10,
			x2: 10,
			y2: 210,
		},
		{
			x1: 210,
			y1: 210,
			x2: 10,
			y2: 210,
		},
		{
			x1: 210,
			y1: 210,
			x2: 210,
			y2: 10,
		},
		{
			x1: 110,
			y1: 110,
			x2: 210,
			y2: 210,
		},
		{
			x1: 110,
			y1: 110,
			x2: 210,
			y2: 10,
		},
		{
			x1: 110,
			y1: 110,
			x2: 10,
			y2: 210,
		},
	],
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
		x1 = event.target.getAttributeNode("x1").nodeValue;
		y1 = event.target.getAttributeNode("y1").nodeValue;
		x2 = event.target.getAttributeNode("x2").nodeValue;
		y2 = event.target.getAttributeNode("y2").nodeValue;
		
		if(this.hasAlreadyBeenClicked(x1, y1, x2, y2)) {
			return;
		}
		if(this.last.X == -1) {
			// If this is the first line clicked
			this.last.X = x1;
			this.last.Y = y1;
			this.last.spareX = x2;
			this.last.spareY = y2;
			this.addToMyLines(x1, y1, x2, y2);
		}
		else if(this.last.spareX != -1) {
			// If this is the second line clicked
			if((this.last.X == x1 && this.last.Y == y1) || (this.last.spareX == x1 && this.last.spareY == y1)) {
				this.last.spareX = -1;
				this.last.spareY = -1;
				
				this.last.X = x2;
				this.last.Y = y2;
				this.addToMyLines(x1, y1, x2, y2);
			}
			else if ((this.last.X == x2 && this.last.Y == y2) || (this.last.spareX == x2 && this.last.spareY == y2)) {
				this.last.spareX = -1;
				this.last.spareY = -1;
				
				this.last.X = x1;
				this.last.Y = y1;
				this.addToMyLines(x1, y1, x2, y2);
			}
		}
		else {
			// This is a normal line click

			if(this.last.X == x1 && this.last.Y == y1) {
				this.last.X = x2;
				this.last.Y = y2;
				this.addToMyLines(x1, y1, x2, y2);
			}
			else if(this.last.X == x2 && this.last.Y == y2) {
				this.last.X = x1;
				this.last.Y = y1;
				this.addToMyLines(x1, y1, x2, y2);
			}
		}
	},
	hasAlreadyBeenClicked: function(x1, y1, x2, y2){
		for(iter = 0; iter < this.myLines.length; iter++) {
			if(x1 == this.myLines[iter].x1 && y1 == this.myLines[iter].y1 && x2 == this.myLines[iter].x2 && y2 == this.myLines[iter].y2) {
				return true;
			}
			else if(x2 == this.myLines[iter].x1 && y2 == this.myLines[iter].y1 && x1 == this.myLines[iter].x2 && y1 == this.myLines[iter].y2) {
				return true;
			}
		}
		return false;
	},
	addToMyLines: function(firstX, firstY, secondX, secondY) {
		var line = {x1: firstX, y1: firstY, x2: secondX, y2: secondY};
		this.myLines.push(line);
		
	}
  }
})       