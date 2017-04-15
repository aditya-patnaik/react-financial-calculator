import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GoalCalculator extends Component{
	constructor(){
		super();
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleYearsChange = this.handleYearsChange.bind(this);
		this.handleYieldChange = this.handleYieldChange.bind(this);
		this.state = {
			amount: 1500000,
			years: 5,
			yield: 0.1,
			result: null,
			errorMessage: null
		}
	}
	componentWillMount(){
		this.calculateResult();
	}
	handleAmountChange(evt){
		this.setState({ amount: evt.target.value }, () => this.calculateResult());
	}
	handleYearsChange(evt){
		this.setState({ years: evt.target.value}, () => this.calculateResult());
	}
	handleYieldChange(evt){
		this.setState({ yield: evt.target.value/100}, () => this.calculateResult());
	}
	validateInputs(){
		if( this.state.amount != null && this.state.years != null && this.state.yield != null ){
			if( this.state.amount > 0 && this.state.years > 0 && this.state.yield > 0 ) {
				if( this.state.yield > 1 ){
					this.setState({ errorMessage: 'Yield cannot be greater than 100' });
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
			var currentState = this.state;
			var result = parseFloat((currentState.amount * currentState.yield/12)/((Math.pow(1+(currentState.yield/12), currentState.years * 12)) - 1));
			this.setState({ result: result, errorMessage: null });
		}
	}
	render(){
				return (
					<div style={{ background: 'linear-gradient( darkgrey, lightgrey, darkgrey)', padding: '10px', boxShadow: '0 0 10px black' }}>
						<div>
							<img src="resources/images/previous.svg" width="30" className='hidden-sm hidden-md hidden-lg' style={{float: 'left', cursor: 'pointer'}} onClick={()=>this.props.openApp(null)}/>
							<h2 style={{textAlign: 'center', borderBottom: '2px solid steelblue', paddingBottom: '10px', marginBottom: '10px' }}>Goal Calculator</h2>
							<div className="row" style={{ marginTop: '20px' }}>
								<div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'left' }}>
									<b>My Goal Amount</b>
									<div className="input-group">
										<div className="input-group-addon">&#8377;</div>
										<input type="number" className="form-control calulatorInput" placeholder="1500000" onChange={this.handleAmountChange}/>
									</div>
								</div>
							</div>

							<div className="row" style={{ textAlign: 'left', marginBottom: '0px' }}>
								<div className="col-md-12 col-sm-12 col-xs-12"><b>Number of years</b></div>
							</div>
							<div className="row" style={{marginTop: '0px'}}>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', paddingLeft: '15px'}}>
									<input id="yieldRange" type="range" step="1" min="0" max="30" onChange={this.handleYearsChange} value={(this.state.years)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Number of years" min="1" max="30" onChange={this.handleYearsChange} value={(this.state.years)} />
										<span className="input-group-addon">yrs</span>
									</div>
								</div>
							</div>

							<div className="row" style={{ textAlign: 'left', marginBottom: '0px' }}>
								<div className="col-md-12 col-sm-12 col-xs-12"><b>Average Yield</b></div>
							</div>
							<div className="row" style={{marginTop: '0px'}}>
								<div className="col-md-7 col-sm-7 col-xs-7" style={{textAlign: 'left', paddingLeft: '15px'}}>
									<input id="yieldRange" type="range" step="1" min="0" max="30" onChange={this.handleYieldChange} value={(this.state.yield*100)} style={{marginTop: '15px'}}/>
								</div>
								<div className="col-md-5 col-sm-5 col-xs-5">
									<div className="input-group">
										<input type="number" className="form-control calulatorInput" placeholder="Average yield" onChange={this.handleYieldChange} value={this.state.yield*100}/>
										<span className="input-group-addon">%</span>
									</div>
								</div>
							</div>
							<div style={{ color: 'crimson', fontWeight: 'bold' }}>{this.state.errorMessage}</div>
						</div>

						<div style={{padding: '10px'}}>
							<div style={{ textAlign: 'center', color: 'steelblue', fontSize: 'x-large' }}>
								<span style={{fontSize: 'large', color: 'black'}}>You need to invest </span>
								<span style={{color: 'black', margin: '0'}}>&#8377;</span>
								{(this.state.result).toFixed(2)}
								<span style={{fontSize: 'large', color: 'black'}}> per month to achieve your goal</span>
							</div>
						</div>
					</div>
				);
			}
}

export default GoalCalculator;