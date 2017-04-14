import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class RetirementPlanning extends Component{
	constructor(){
		super();
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleMonthsChange = this.handleMonthsChange.bind(this);
		this.handleYieldChange = this.handleYieldChange.bind(this);
		this.validateInputs = this.validateInputs.bind(this);
		this.calculateResult = this.calculateResult.bind(this);
		this.state = {
			amount: 5000,
			months: 36,
			yield: 0.18,
			errorMessage: null,
			result: null,
			inflationRate: 0.04,
			inflationAdjustedResult: null,
			delay: 24,
			updateRequired: false
		};
	}
	componentWillMount(){
		this.calculateResult();
	}
	componentDidUpdate(){
		if(this.state.updateRequired) this.calculateResult();
	}
	handleAmountChange(evt){
		this.setState({ amount: evt.target.value, updateRequired: true });
	}
	handleMonthsChange(evt){
		this.setState({ months: evt.target.value, updateRequired: true });
	}
	handleYieldChange(evt){
		this.setState({ yield: evt.target.value/100, updateRequired: true });
	}
	validateInputs(){
		if( this.state.amount != null && this.state.months != null && this.state.yield != null ){
			if( this.state.amount > 0 && this.state.months > 0 && this.state.yield > 0 ) {
				if( this.state.yield >= 1 ){
					this.setState({ errorMessage: 'Yield percentage cannot be greater than 100' });
					return false;
				} else{
					return true;
				}
			} else {
				this.setState({ errorMessage: 'Negative values detected' });
				return false;
			}
		} else{
			this.setState({ errorMessage: 'Empty field/(s) detected' });
			return false;
		}
	}
	calculateResult() {
		//console.log('calculating result');
		if( this.validateInputs() ){
			var currentState = this.state;
			var result = parseFloat(currentState.amount*(Math.pow(1+(currentState.yield/12), currentState.months) - 1)/(currentState.yield/12));
			var inflationAdjustedResult = parseFloat(result/(Math.pow(1+currentState.inflationRate, currentState.months/12)));

			var delayCost = parseFloat((result-(currentState.amount*(Math.pow((1+(currentState.yield/12)),(currentState.months-currentState.delay))-1)/(currentState.yield/12))));
			var inflationAdjustedDelayCost = parseFloat((result-(currentState.amount*(Math.pow((1+(currentState.yield/12)),(currentState.months-currentState.delay))-1)/(currentState.yield/12)))/(Math.pow((1+currentState.inflationRate),((currentState.months-currentState.delay)/12))));

			this.setState({ errorMessage: null, updateRequired: false, result: result.toFixed(2), inflationAdjustedResult: inflationAdjustedResult.toFixed(2), delayCost: delayCost.toFixed(2), inflationAdjustedDelayCost: inflationAdjustedDelayCost.toFixed(2) });
		}
	}
	toggleTable(){
		if( $('.viewMore table').css('display') == 'none' )
			$('.viewMore table').show('blind');
		else
			$('.viewMore table').hide('blind');
	}
	render(){
		return (
			<div style={{ background: 'linear-gradient( darkgrey, lightgrey, darkgrey)', padding: '10px', boxShadow: '0 0 10px black' }}>
				<div>
					<h2 style={{textAlign: 'center', borderBottom: '2px solid steelblue', paddingBottom: '10px', marginBottom: '10px' }}>Retirement Planning</h2>
					<div className="row" style={{ marginTop: '20px' }}>
						<div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'left' }}>
							<b>Monthly Amount</b>
							<div className="input-group">
							    <div className="input-group-addon">&#8377;</div>
								<input type="number" className="form-control calulatorInput " placeholder="5000" onChange={this.handleAmountChange}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'left' }}>
							<b>No. of Months</b>
							<div className="input-group">
								<input type="number" className="form-control calulatorInput" placeholder="36" min="1" max="30" onChange={this.handleMonthsChange} />
								<span className="input-group-addon">months</span>
							</div>
						</div>
					</div>
					<div className="row" style={{ textAlign: 'left', marginBottom: '0' }}>
						<div className="col-md-12 col-sm-12 col-xs-12"><b>Expected Yield/Year</b></div>
					</div>
					<div className="row">
						<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', paddingLeft: '15px'}}>
							<input id="yieldRange" type="range" step="1" min="0" max="30" onChange={this.handleYieldChange} value={(this.state.yield*100)} style={{ marginTop: '15px' }}/>
						</div>
						<div className="col-md-5 col-sm-5 col-xs-5">
							<div className="input-group">
								<input type="number" className="form-control calulatorInput" placeholder="%" min="1" max="30" onChange={this.handleYieldChange} value={(this.state.yield*100)} />
								<span className="input-group-addon">%</span>
							</div>
						</div>
					</div>
					<div style={{ color: 'crimson', fontWeight: 'bold' }}>{this.state.errorMessage}</div>
				</div>

				<div style={{padding: '20px'}}>
					<div style={{ color: 'steelblue', fontSize: 'x-large', textAlign: 'center' }}>
						<span style={{fontSize: 'large', color: 'black'}}>Amount after term :</span>
						<span style={{color: 'black', margin: '0 10px 0 20px'}}>&#8377;</span>
						{this.state.result}
						<div style={{fontSize: 'medium', color: 'black', marginTop: '10px'}}>
							for an amount of ₹{this.state.amount} with {this.state.yield*100}% interest per annum for {this.state.months} months
						</div>
					</div>
					<div className="viewMore" style={{ marginTop: '20px' }}>
						<div style={{ paddingBottom: '5px', marginBottom: '10px', fontWeight: 'bold', fontSize: 'medium', borderBottom: '2px solid steelblue' }}>
							Inflation Adjustment
							<span src="images/expand-arrows.svg" width="25" onClick={this.toggleTable} id='viewMoreBtn'>&darr;</span>
						</div>
						<table className="table" >
							<tr>
								<td>Inflation Rate :</td>
								<td>{this.state.inflationRate*100} %</td>
							</tr>
							<tr>
								<td>Inflation Adjusted Amount after term :</td>
								<td>₹{this.state.inflationAdjustedResult}</td>
							</tr>
							<tr>
								<td>Delay in Investing (in months) :</td>
								<td>{this.state.delay}</td>
							</tr>
							<tr>
								<td>Cost of Delay :</td>
								<td>₹{this.state.delayCost}</td>
							</tr>
							<tr>
								<td>Inflation Adjusted Cost of delay :</td>
								<td>₹{this.state.inflationAdjustedDelayCost}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		);
		
	}
}

export default RetirementPlanning;