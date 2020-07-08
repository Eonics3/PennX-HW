class FontChooser extends React.Component {

    constructor(props) {
		super(props);
		this.state={hidden: true, bold: this.props.bold=='true', fontSize: Number(this.props.size), min: this.props.min, max: this.props.max, color:false};
    }
	toggleShow(){
		//checkPresets
		var min = Number(this.state.min)
		var max = Number(this.state.max)
		var size= Number(this.state.fontSize)
		
		//check if min is less than or equal to 0
		if(min<=0){
			min = 1
		}
		//check if min is greater than max
		if(min>max){
			var tempo = min
			min = max
			max = tempo
		}
		//check if the size is less than min
		if(size<min){
			size = min;
		}
		//check if the size is greater than max
		if(size>max){
			size = max;
		}
		//check the color of fontsize
		if(size==min||size==max){
			this.state.color = true;
		}
		this.setState({min:min, max:max, fontSize:size,hidden: !this.state.hidden})
	}
	toggleBold(){
		this.setState({bold: !this.state.bold})
		
	}
	increaseHandler(){
		//if hit the max, stop
		if(this.state.fontSize==this.state.max){
		}
		else{
			if(this.state.fontSize+1==this.state.max){
				this.setState({color: true,fontSize: this.state.fontSize+1})
			}
			else{
				this.setState({color: false,fontSize: this.state.fontSize+1})
			}
			
		}
		//console.log(this.state.fontSize)
	}
	decreaseHandler(){
		//decrease till min
		if(this.state.fontSize==this.state.min){

		}
		else{
			if(this.state.fontSize-1==this.state.min){
				this.setState({color: true,fontSize: this.state.fontSize-1})
			}
			else{
				this.setState({color: false,fontSize: this.state.fontSize-1})
			}
		}
		//console.log(this.state.fontSize)
	}
	dblClick(){
		var temp = Number(this.props.size);
		if(temp<Number(this.state.min)){
			temp = Number(this.state.min)
			this.setState({color:true, fontSize: temp})
		}
		else if(temp>Number(this.state.max)){
			temp = Number(this.state.max)
			this.setState({color:true, fontSize: temp})
		}
		else{
			this.setState({fontSize: temp})
		}
		
	}
    render() {
		var isBold = this.state.bold?"bold":"normal";
		var fontColor = this.state.color? "red":"black";
		var size = this.state.fontSize;
		if(Number(this.state.min)<=0){
			min = 1
		}
		if(size<Number(this.state.min)){
			size=this.state.min
		}

		return(
	       <div>
			<input type="checkbox" id="boldCheckbox" hidden={this.state.hidden} onClick={this.toggleBold.bind(this)} checked={this.state.bold}/>
			<button id="decreaseButton" hidden={this.state.hidden} onClick={this.decreaseHandler.bind(this)}>-</button>
			<span id="fontSizeSpan" hidden={this.state.hidden} onDoubleClick ={this.dblClick.bind(this)}style={{color: fontColor}}>{this.state.fontSize}</span>
			<button id="increaseButton" hidden={this.state.hidden} onClick={this.increaseHandler.bind(this)}>+</button>
			<p> </p>
			<span id="textSpan" onClick={this.toggleShow.bind(this)} style={{fontWeight:isBold, fontSize:size}}>{this.props.text}</span>
	       </div>
		);
	}
	
}


/*
Pseudo Code:
1. when the text is clicked, make all the inputs unhidden
2. If user clicks checkbox, the text becomes bold. If user presses butons, fontsize should increase or decrease. 
3. When user clicks again, make all the inputs hidden again



*/

