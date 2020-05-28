import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import {Container} from "react-bootstrap";

export default class AddressOne extends React.Component {
	render() {
		return (
			<Container fluid={true}>
				<div>
					<h3>AddressOne Page</h3>
					<Link to="/#routers-demo">Return to Homepage</Link>
				</div>
			</Container>
		)
	}
}