import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SIPCalculator from './calculators/SIPCalculator';
import FDCalculator from './calculators/FDCalculator';

class MainMenu extends Component {
	constructor() {
		super();
		this.state = {
			selectedMenu: 0
		};
	}
	updateSelectedMenu(selectedMenu) {
		this.props.openApp(selectedMenu);
		//this.setState({ selectedMenu: selectedMenu });
	}
	render(){
		return (
			<div className='row'>
				<div className="col-md-12">
					<div className='row'>
						<div className='col-md-2 col-md-offset-1 tile'>
							<div style={{ background: '#EF9A9A' }} className='calcSelectorLabel' onClick={()=>this.props.openApp(1)}>
								<div>
									<img src='./resources/images/return-of-investment.svg' width='50' style={{ margin: 'auto' }} />
								</div>
								<div className='calcLabel'>SIP Calculator</div>
							</div>
						</div>
						<div className='col-md-2 tile'>
							<div style={{ background: '#F48FB1' }} className='calcSelectorLabel' onClick={()=>this.props.openApp(2)}>
								<div>
									<img src='./resources/images/safe-deposit-box.svg' width='50' style={{ margin: 'auto' }} />
								</div>
								<div className='calcLabel'>FD Calculator</div>
							</div>
						</div>
						<div className='col-md-2 tile'>
							<div style={{ background: 'rgb(206, 147, 216)' }} className='calcSelectorLabel' onClick={()=>this.props.openApp(3)}>
								<div>
									<img src='./resources/images/goal.svg' width='50' style={{ margin: 'auto' }} />
								</div>
								<div className='calcLabel'>Goal Calculator</div>
							</div>
						</div>
						<div className='col-md-2 tile'>
							<div style={{ background: '#FFCC80' }} className='calcSelectorLabel' onClick={()=>this.props.openApp(4)}>
								<div>
									<img src='./resources/images/emi.svg' width='50' style={{ margin: 'auto' }} />
								</div>
								<div className='calcLabel'>EMI Calculator</div>
							</div>
						</div>
						<div className='col-md-2 tile'>
							<div style={{ background: '#FFECB3' }} className='calcSelectorLabel' onClick={()=>this.props.openApp(5)}>
								<div>
									<img src='./resources/images/list.svg' width='50' style={{ margin: 'auto' }} />
								</div>
								<div className='calcLabel'>Retirement Planning</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MainMenu;