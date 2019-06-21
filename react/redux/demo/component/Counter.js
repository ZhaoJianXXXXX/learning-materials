import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
	constructor(props) {
		super(props);
		this.incrementAsync = this.incrementAsync.bind(this);
		this.incrementIfOdd = this.incrementIfOdd.bind(this);
	}

	incrementIfOdd() {
		if (this.props.value % 2 !== 0) {
			this.props.onIncrement()
		}
	}

	incrementAsync() {
		setTimeout(this.props.onIncrement, 1000);
	}

	render() {
		const { value, onIncrement, onDecrement } = this.props;
		return (
			<React.Fragment>
				<div>Clicked: {value} times</div>
				<button onClick = { onIncrement }>+</button>&nbsp;&nbsp;
				<button onClick = { onDecrement }>-</button>&nbsp;&nbsp;
				<button onClick = { this.incrementIfOdd }>Increment if odd</button>&nbsp;&nbsp;
				<button onClick = { this.incrementAsync }>Increment async</button>
			</React.Fragment>
		)
	}
}

Counter.propTypes = {
	value: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired
}

export default Counter
