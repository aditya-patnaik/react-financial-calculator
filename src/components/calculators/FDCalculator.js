import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class FDCalculator extends Component{
	constructor(){
		super();
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleMonthsChange = this.handleMonthsChange.bind(this);
		this.handleRateChange = this.handleRateChange.bind(this);
		this.handleCompPeriodChange = this.handleCompPeriodChange.bind(this);
		this.handleTaxRateChange = this.handleTaxRateChange.bind(this);
		this.handleInflationRateChange = this.handleInflationRateChange.bind(this);
		this.calculateResult = this.calculateResult.bind(this);
		this.calculateInflationAdjustment = this.calculateInflationAdjustment.bind(this);
		this.state = {
			amount: 100000,
			months: 36,
			rate: 0.065,
			compoundPeriod: 1,
			result: null,
			errorMessage: null,
			annualYield: 0.0716,
			taxRate: 0.23,
			returnAfterTax: null,
			yieldAfterTax: null,
			inflationRate: 0,
			inflationAdjustedReturn: null,
			inflationAdjustedActualYield: null,
			inflationAdjustedAnnualYield: null
		}
	}
	componentWillMount(){
		this.calculateResult();
	}
	handleAmountChange(evt){
		this.setState({ amount: evt.target.value }, () => this.calculateResult());
	}
	handleMonthsChange(evt){
		this.setState({ months: evt.target.value }, () => this.calculateResult());
	}
	handleRateChange(evt){
		this.setState({ rate: evt.target.value/100 }, () => this.calculateResult());
	}
	handleCompPeriodChange(evt){
		this.setState({ compoundPeriod: evt.target.value }, () => this.calculateResult());
	}
	handleTaxRateChange(evt){
		this.setState({ taxRate: evt.target.value }, () => {
			this.calculateReturnAfterTax();
		});
	}
	handleInflationRateChange(evt){
		this.setState({ inflationRate: (evt.target.value/100).toFixed(2) }, () => this.calculateInflationAdjustment());
	}
	validateInputs(){
		if( this.state.amount != null && this.state.months != null && this.state.rate != null ){
			if( this.state.amount > 0 && this.state.months > 0 && this.state.rate > 0 ) {
				if( this.state.rate >= 1 ){
					this.setState({ errorMessage: 'Investment Rate cannot be greater than 100' });
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
		if( this.validateInputs() ){
			if( this.state.amount != null && this.state.months != null && this.state.rate != null && this.state.compoundPeriod != null  ){
				var currentState = this.state;
				var result = parseFloat((currentState.amount * (Math.pow(1 + (currentState.rate/currentState.compoundPeriod), currentState.months))));
				this.setState({ result: result.toFixed(2) }, () => {
					this.calculateReturnAfterTax(this.calculateInflationAdjustment);
				});
			}
		}
	}
	calculateReturnAfterTax(callback) {
		var returnAfterTax = parseFloat(((this.state.result-this.state.amount)*(1-this.state.taxRate)) + parseFloat(this.state.amount) );
		var yieldAfterTax = parseFloat(((returnAfterTax-this.state.amount)/(this.state.months/12))/this.state.amount);
		this.setState({ returnAfterTax: returnAfterTax.toFixed(2), yieldAfterTax: yieldAfterTax }, () => {
			if(callback) callback();
		});
	}
	calculateInflationAdjustment(){
		var result = parseFloat(this.state.returnAfterTax-(this.state.returnAfterTax*this.state.inflationRate*(this.state.months/12)));
		var actualYield = parseFloat((result-this.state.amount)/this.state.amount);
		var annualYield = parseFloat(actualYield/(this.state.months/12));
		this.setState({ inflationAdjustedReturn: result.toFixed(2), inflationAdjustedActualYield: actualYield.toFixed(4), inflationAdjustedAnnualYield: annualYield.toFixed(4) });
	}
	render(){
				return (
					<div style={{ background: 'linear-gradient( darkgrey, lightgrey, darkgrey)', padding: '10px', boxShadow: '0 0 10px black' }}>
						<div>
							<h2 style={{textAlign: 'center', borderBottom: '2px solid steelblue', paddingBottom: '10px', marginBottom: '10px' }}>FD Calculator</h2>
							<div className="row" style={{ marginTop: '20px' }}>
								<div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'left' }}>
									<b>Investment Value</b>
									<div className="input-group">
										<div className="input-group-addon">&#8377;</div>
										<input type="number" className="form-control calulatorInput" placeholder="100000" onChange={this.handleAmountChange}/>
									</div>
								</div>
							</div>
							<div className="row" style={{ textAlign: 'left', marginBottom: '0' }}>
								<div className="col-md-12 col-sm-12 col-xs-12"><b>Investment Rate</b></div>
							</div>
							<div className="row" style={{marginTop: '0'}}>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', paddingLeft: '15px'}}>
									<input id="yieldRange" type="range" step="1" min="0" max="30" onChange={this.handleRateChange} value={(this.state.rate*100)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Investment Rate" min="1" max="30" onChange={this.handleRateChange} value={(this.state.rate*100)}/>
										<span className="input-group-addon">%</span>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12" style={{ textAlign: 'left' }}>
									<b>Compounding Period</b>
									<select className="form-control" onChange={this.handleCompPeriodChange} style={{ textAlign: 'center', marginTop: '5px' }}>
										<option value="1" selected>Yearly</option>
										<option value="6">Half-Yearly</option>
										<option value="4">Quaterly</option>
										<option value="12">Monthly</option>
									</select>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'left' }}>
									<b>No. of Months</b>
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="36" min="1" onChange={this.handleMonthsChange} />
										<span className="input-group-addon">months</span>
									</div>
								</div>
							</div>
							<div style={{ color: 'crimson', fontWeight: 'bold' }}>{this.state.errorMessage}</div>
						</div>

						<div style={{padding: '10px'}}>
							<div style={{ textAlign: 'center', color: 'steelblue', fontSize: 'x-large' }}>
								<span style={{fontSize: 'large', color: 'black'}}>Amount after term :</span>
								<span style={{color: 'black', margin: '0 10px 0 20px'}}>&#8377;</span>
								{this.state.result}
							</div>
							<div style={{textAlign: 'center'}}>Annualized Yield: {this.state.annualYield*100} %</div>
							
							<div className="row">
							<div className="viewMore col-md-6" style={{ marginTop: '20px' }}>
								<div style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: 'medium' }}>
									Tax Adjustment
								</div>
								<table className="table" style={{marginBottom: '0px'}}>
									<tbody style={{borderTop: '2px solid steelblue'}}>
										<tr>
											<td>Tax Rate :</td>
											<td>
												<select onChange={this.handleTaxRateChange}>
													<option value="0">0%</option>
													<option value="0.10">10%</option>
													<option value="0.20">20%</option>
													<option value="0.23" selected>23%</option>
													<option value="0.30">30%</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>Return After Taxes :</td>
											<td>₹{this.state.returnAfterTax}</td>
										</tr>
										<tr>
											<td>Annualized Yield After Taxes :</td>
											<td>{(this.state.yieldAfterTax*100).toFixed(2)} %</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="viewMore inflationAdjustment col-md-6" style={{ marginTop: '20px' }}>
								<div style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: 'medium' }}>
									Inflation Adjustment
								</div>
								<table className="table" style={{ borderTop: '2px solid steelblue' }}>
									<tbody>
									<tr>
										<td>Inflation Rate :</td>
										<td><input type="number" className="calulatorInput" placeholder="%" min="0" max="30" onChange={this.handleInflationRateChange} value={(this.state.inflationRate*100)} style={{textAlign: 'right'}} />%</td>
									</tr>
									<tr>
										<td>Inflation Adjusted Return :</td>
										<td>₹{this.state.inflationAdjustedReturn}</td>
									</tr>
									<tr>
										<td>Inflation Adjusted Actual Yield (Net) :</td>
										<td>{(this.state.inflationAdjustedActualYield*100).toFixed(2)}%</td>
									</tr>
									<tr>
										<td>Inflation Adjusted Annualized Yield :</td>
										<td>{(this.state.inflationAdjustedAnnualYield*100).toFixed(2)}%</td>
									</tr>
									</tbody>
								</table>
							</div>
							</div>
						</div>
					</div>
				);
			}
}

export default FDCalculator;