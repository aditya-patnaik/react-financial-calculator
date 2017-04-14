import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';

class Hello extends React.Component {
	render() {
		return (
			<MainContainer />
		)
	}
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));