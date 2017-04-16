import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class RetirementPlanning extends Component{
	constructor(){
		super();
		this.handleCurrentCorpusChange = this.handleCurrentCorpusChange.bind(this);
		this.handleLifeStyle = this.handleLifeStyle.bind(this);
		this.handleMonthlySavings = this.handleMonthlySavings.bind(this);
		this.handleExpectedROR = this.handleExpectedROR.bind(this);
		this.handleCurrentAgeChange = this.handleCurrentAgeChange.bind(this);
		this.handleRetirementAgeChange = this.handleRetirementAgeChange.bind(this);
		this.handleInflationRateChange = this.handleInflationRateChange.bind(this);
		this.handleTaxRateChange = this.handleTaxRateChange.bind(this);
		this.handleRetirementBenefitChange = this.handleRetirementBenefitChange.bind(this);
		this.state = {
			currentCorpus: 2000000,
			lifeStyle: 300000,
			monthlySavings: 100000,
			expectedROR: 0.12,
			expectedRORToDisplay: 12,
			currentAge: 50,
			retirementAge: 65,
			inflationRate: 0.05,
			inflationRateToDisplay: 5,
			taxRate: .12,
			taxRateToDisplay: 12,
			retirementBenefit: 0,
			result: null
		}
	}
	componentWillMount(){
		this.calculateResult();
	}
	handleCurrentCorpusChange(evt){
		this.setState({ currentCorpus: evt.target.value }, () => this.calculateResult());
	}
	handleLifeStyle(evt){
		this.setState({ lifeStyle: evt.target.value }, () => this.calculateResult());
	}
	handleMonthlySavings(evt){
		this.setState({ monthlySavings: evt.target.value }, () => this.calculateResult());
	}
	handleExpectedROR(evt){
		this.setState({ expectedROR: evt.target.value/100, expectedRORToDisplay: evt.target.value }, () => this.calculateResult());
	}
	handleCurrentAgeChange(evt){
		if(evt.target.value < this.state.retirementAge){
			this.setState({ currentAge: evt.target.value });
		}
	}
	handleRetirementAgeChange(evt){
		if(evt.target.value > this.state.currentAge){
			this.setState({ retirementAge: evt.target.value });
		}
	}
	handleInflationRateChange(evt){
		this.setState({ inflationRate: evt.target.value/100, inflationRateToDisplay: evt.target.value });
	}
	handleTaxRateChange(evt){
		this.setState({ taxRate: evt.target.value/100, taxRateToDisplay: evt.target.value });
	}
	handleRetirementBenefitChange(evt){
		this.setState({ retirementBenefit: evt.target.value });
	}
	calculateResult() {
		if( this.state.currentCorpus != null && this.state.lifeStyle != null && this.state.monthlySavings != null ){
			var currentState = this.state;
			var result = parseFloat(((currentState.currentCorpus * (Math.pow(1 + (currentState.expectedROR/12), (currentState.retirementAge - currentState.currentAge) * 12))) + ((currentState.monthlySavings * ((Math.pow(1 + (currentState.expectedROR/12), (currentState.retirementAge - currentState.currentAge) * 12) - 1)/(currentState.expectedROR/12)) *(1 + (currentState.expectedROR/12) )*(1+(currentState.expectedROR/12))))));
			this.setState({ result: result });
		}
	}
	render(){
			return (
				<div style={{ background: 'linear-gradient( darkgrey, lightgrey, darkgrey)', padding: '10px', boxShadow: '0 0 10px black' }}>
					<div>
						<img src="resources/images/previous.svg" width="30" className='hidden-sm hidden-md hidden-lg' style={{float: 'left', cursor: 'pointer'}} onClick={()=>this.props.openApp(null)}/>
						<h2 style={{textAlign: 'center', borderBottom: '2px solid steelblue', paddingBottom: '10px', marginBottom: '10px' }}>Retirement Planning</h2>
						<div style={{padding: '0 10px'}}>
							<div className="row">
							<b>Current Corpus</b>
							<input type="number" className="form-control calulatorInput" placeholder="Current Corpus" onChange={this.handleCurrentCorpusChange} value={this.state.currentCorpus}/>
							</div>
							<div className="row">
							<b>Current Monthly Expenditure</b>
							<input type="number" className="form-control calulatorInput" placeholder="Current Monthly Expenditure" min="1" onChange={this.handleLifeStyle} value={this.state.lifeStyle}/>
							</div>
							<div className="row">
							<b>Current Monthly Savings</b>
							<input type="number" className="form-control calulatorInput" placeholder="Current Monthly Savings" min="1" onChange={this.handleMonthlySavings} value={this.state.monthlySavings}/>
							</div>
							<div className="row">
							<div><b>Expected Rate of Return</b></div>
							<div>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', padding: '0'}}>
									<input id="yieldRange" type="range" step="1" min="0" max="100" onChange={this.handleExpectedROR} value={(this.state.expectedRORToDisplay)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Expected Rate of Return" onChange={this.handleExpectedROR} value={this.state.expectedRORToDisplay}/>
										<span className="input-group-addon">%</span>
									</div>
								</div>
							</div>
							</div>
							<div className="row">
							<div><b>Current Age</b></div>
							<div>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', padding: '0'}}>
									<input id="yieldRange" type="range" step="1" min="40" max="75" onChange={this.handleCurrentAgeChange} value={(this.state.currentAge)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Current Age" onChange={this.handleCurrentAgeChange} value={this.state.currentAge}/>
										<span className="input-group-addon">yrs</span>
									</div>
								</div>
							</div>
							</div>
							<div className="row">
							<div><b>Expected Age of Retirement</b></div>
							<div>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', padding: '0'}}>
									<input id="yieldRange" type="range" step="1" min="40" max="75" onChange={this.handleRetirementAgeChange} value={(this.state.retirementAge)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Expected Age of Retirement" onChange={this.handleRetirementAgeChange} value={this.state.retirementAge}/>
										<span className="input-group-addon">yrs</span>
									</div>
								</div>
							</div>
							</div>
							<div className="row">
							<div><b>Inflation Rate</b></div>
							<div>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', padding: '0'}}>
									<input type="range" step="1" min="0" max="100" onChange={this.handleInflationRateChange} value={(this.state.inflationRateToDisplay)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Inflation Rate" onChange={this.handleInflationRateChange} value={(this.state.inflationRateToDisplay)}/>
										<span className="input-group-addon">%</span>
									</div>
								</div>
							</div>
							</div>
							<div className="row">
							<div><b>Tax Rate</b></div>
							<div>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', padding: '0'}}>
									<input type="range" step="1" min="0" max="100" onChange={this.handleTaxRateChange} value={(this.state.taxRateToDisplay)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Tax Rate" onChange={this.handleTaxRateChange} value={this.state.taxRateToDisplay}/>
										<span className="input-group-addon">%</span>
									</div>
								</div>
							</div>
							</div>
							<div className="row">
							<b>Retirement Benefit</b>
							<input type="number" className="form-control calulatorInput" placeholder="Retirement Benefit" onChange={this.handleRetirementBenefitChange} value={this.state.retirementBenefit}/>
							</div>
							<div style={{ textAlign: 'center', color: 'steelblue', fontSize: 'x-large' }}>
								<span style={{fontSize: 'large', color: 'black'}}>FV of Investment before Inflation and taxes :</span>
								<span style={{color: 'black', margin: '0 10px 0 20px'}}>&#8377;</span>
								{(this.state.result).toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			);
		}
}

export default RetirementPlanning;