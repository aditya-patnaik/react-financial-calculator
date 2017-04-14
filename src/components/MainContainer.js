import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MainMenu from './MainMenu';
import SIPCalculator from './calculators/SIPCalculator';
import FDCalculator from './calculators/FDCalculator';
import GoalCalculator from './calculators/GoalCalculator';
import EMICalculator from './calculators/EMICalculator';
import RetirementPlanning from './calculators/RetirementPlanning';
import SideMenu from './MainMenu-docked';

class MainContainer extends Component {
	constructor(){
		super();
		this.openApp = this.openApp.bind(this);
		this.state = {
			selectedMenu: null
		};
	}
	openApp(menu){
		this.setState({ selectedMenu: menu });
	}
	render(){
		var output, selectedCalculator;
		if(this.state.selectedMenu!=null){
			if(this.state.selectedMenu===1) selectedCalculator = <SIPCalculator />
			else if(this.state.selectedMenu===2) selectedCalculator = <FDCalculator />
			else if(this.state.selectedMenu===3) selectedCalculator = <GoalCalculator />
			else if(this.state.selectedMenu===4) selectedCalculator = <EMICalculator />
			else if(this.state.selectedMenu===5) selectedCalculator = <RetirementPlanning />
			output = (
				<div className='row'>
					<div className='col-md-8'>
						{selectedCalculator}
					</div>
					<div className='col-md-4'>
						<SideMenu openApp={this.openApp} selectedMenu={this.state.selectedMenu}/>
					</div>
				</div>
			);
		} else{
			output = (
				<MainMenu openApp={this.openApp}/>
			);
		}
		return output;
	}
}

export default MainContainer;