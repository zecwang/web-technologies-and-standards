import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
// set highlight style
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism";
// set highlighted language
import {javascript, jsx} from "react-syntax-highlighter/dist/esm/languages/prism";

// * this code from https://segmentfault.com/a/1190000020294373 *
export default class CodeBlock extends PureComponent {
	static propTypes = {
		value: PropTypes.string.isRequired,
		language: PropTypes.string
	};
	
	static defaultProps = {
		language: null
	};
	
	componentDidMount() {
		// register the language to be highlighted
		SyntaxHighlighter.registerLanguage("jsx", jsx);
		SyntaxHighlighter.registerLanguage("javascript", javascript);
	}
	
	render() {
		const {language, value} = this.props;
		return (
			<figure className="highlight">
				<SyntaxHighlighter language={language} style={coy}>
					{value}
				</SyntaxHighlighter>
			</figure>
		);
	}
}