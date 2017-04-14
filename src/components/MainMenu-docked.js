import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SideMenu extends Component{
	render(){
		return (
			<div id='sideMenuContainer'>
				<div onClick={()=>this.props.openApp(1)} className='row' style={{borderTop: '1px solid lightgrey'}}>
					{ (this.props.selectedMenu===1) ? <span style={{float: 'left', marginRight: '10px'}}>&rarr;</span> : <span></span>}
					SIP Calculator
				</div>
				<div onClick={()=>this.props.openApp(2)} className='row'>
					{ (this.props.selectedMenu===2) ? <span style={{float: 'left', marginRight: '10px'}}>&rarr;</span> : <span></span>}
					FD Calculator
				</div>
				<div onClick={()=>this.props.openApp(3)} className='row'>
					{ (this.props.selectedMenu===3) ? <span style={{float: 'left', marginRight: '10px'}}>&rarr;</span> : <span></span>}
					Goal Calculator
				</div>
				<div onClick={()=>this.props.openApp(4)} className='row'>
					{ (this.props.selectedMenu===4) ? <span style={{float: 'left', marginRight: '10px'}}>&rarr;</span> : <span></span>}
					EMI Calculator
				</div>
				<div onClick={()=>this.props.openApp(5)} className='row'>
					{ (this.props.selectedMenu===5) ? <span style={{float: 'left', marginRight: '10px'}}>&rarr;</span> : <span></span>}
					Retirement Planning
				</div>
			</div>
		);
	}
}

export default SideMenu;