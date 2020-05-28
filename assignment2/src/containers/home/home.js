import React from 'react';
import ReactMarkdown from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css';
import NewsItems from "../../components/data/newsItems";
import {Button, Col, Container, Form} from "react-bootstrap";
import {Link} from 'react-router-dom';
import CodeBlock from "../../components/CodeBlock"
import newItemsSourceCodePath from "./newItemsSourceCode.md";
import reactAppGlitchMDPath from "./AddReactAppToGlitch.md";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		document.title = "Assignment 2";
		this.state = {
			newItemsSourceCode: null,
			reactAppGlitchTutorial: null,
		}
	}
	
	componentDidMount() {
		fetch(newItemsSourceCodePath).then((res) => res.text()).then((text) => {
			this.setState({newItemsSourceCode: text})
		});
		fetch(reactAppGlitchMDPath).then((res) => res.text()).then((text) => {
			this.setState({reactAppGlitchTutorial: text})
		})
	}
	
	submitHandler = (event) => {
		event.preventDefault();
		let data = {};
		const formData = new FormData(event.target);
		formData.forEach((val, key) => data[key] = val);
		// some methods to get the data:
		// console.log(formData.get("email"));
		// console.log(formData.get("password"));
		// console.log(this.state.email);
		// console.log(this.state.password);
		this.setState({
			formDataStr: JSON.stringify(data)
		})
	};
	
	// example for onChange listener
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	};
	
	render() {
		return (
			<Container fluid={true}>
				<h1>Assignment 2</h1>
				<pre>Student: Zechen Wang, Email: zew20@pitt.edu</pre>
				<p>The framework I used for this assignment is <strong>React</strong>.</p>
				<p>And I will demonstrate how to use this framework to design the web pages.</p>
				<hr/>
				
				<h3>Command(s) for installing some extra libraries:</h3>
				<p>I need some extra libraries for routers, bootstrap, and some markdown style supports</p>
				<ul>
					<li><code>npm install --save react-router-dom react-router-hash-link</code></li>
					<li><code>npm install --save react-bootstrap
						bootstrap</code></li>
					<li><code>npm install --save raw-loader react-markdown prop-types
						react-syntax-highlighter</code>
					</li>
				</ul>
				<hr/>
				
				<h3 id="routers-demo">Routers</h3>
				<p>I configured some routers examples here:</p>
				<ol style={{listStyleType: "decimal"}}>
					<li><Link to="/addressOne">AddressOne</Link></li>
					<li><Link to="/addressTwo">AddressTwo</Link></li>
					<li><Link to="/addressThree">Redirect to AddressOne</Link></li>
				</ol>
				<hr/>
				
				<h3>Read data from a JSON file, and display 10 records as a table.</h3>
				<p>The source code is:</p>
				<ReactMarkdown
					source={this.state.newItemsSourceCode}
					escapeHtml={false}
					renderers={{
						code: CodeBlock
					}}
				/>
				<p>The results (will only show Title column on small screens):</p>
				<NewsItems/>
				<hr/>
				
				<h3>Forms</h3>
				<p></p>
				<Form onSubmit={this.submitHandler}>
					<Form.Group controlId="emailForm">
						<Form.Label column={false}>Email address</Form.Label>
						<Col xl={4} lg={5} sm={12} className="px-0">
							<Form.Control name="email" type="email" placeholder="Enter email"
							              onChange={this.changeHandler}/>
						</Col>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
					
					<Form.Group controlId="passwordForm">
						<Form.Label column={false}>Password</Form.Label>
						<Col xl={4} lg={5} sm={12} className="px-0">
							<Form.Control name="password" type="password" placeholder="Password"
							              onChange={this.changeHandler}/>
						</Col>
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check name="checkbox" type="checkbox" label="checkbox"/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				{this.state.formDataStr ? <p>{this.state.formDataStr}</p> : ''}
				<hr/>
				
				<h3>Tutorial for adding a React App to Glitch</h3>
				<p>I encountered some problems when I tried to add this React project to Glitch. Here is my
					solution:</p>
				<ReactMarkdown
					source={this.state.reactAppGlitchTutorial}
					escapeHtml={false}
					renderers={{
						code: CodeBlock
					}}
				/>
				<hr/>
				
				<h3>Summary</h3>
				<Col xl={10} lg={12} className="px-0">
					<p>In this assignment, I only demonstrate several features that I might commonly use in a React
						project.</p>
					<p>In terms of my experience for this project, React framework is so interesting and useful. Though
						for a novice, it really takes a bunch of time to learn it, and I can hardly find a complete or
						well-structured tutorial which can tell me everything. In most cases, when I meet a problem,
						I need to do a lot of Google searches to find a solution, and some answers may work, while some
						others may not. This process is kind of torturing.</p>
					<p>But I will definitely use this framework again in the future. It's so cool!!!</p>
				</Col>
				
				<pre style={{textAlign: "center"}}>Oct 26, 2019 &copy;Zechen Wang</pre>
			</Container>
		);
	}
}