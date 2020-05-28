# Assignment 2

## What framework did you pick and why
The framework I picked for this project is **React**.

I have several reasons for choosing this framework.

First, **React** is made by Facebook. Therefore, this framework must contain some great ideas that they come up with when they develop a website. Thus, I want to learn those ideas by using this framework.

One of those great ideas is *one-way data flow*, in **React** it means that:
- state is passed to the view and to child components
- actions are triggered by the view
- actions can update the state
- the state change is passed to the view and to child components

![One-way data flow](https://cdn.glitch.com/c343f923-f9cc-49fe-973f-2866c84f34e5%2Fview-actions-state.png?v=1572212319809)
One-way data flow is less error prone, as we have more control over the data. And it is easier to debug, as we know *what* is coming from *where*.

Another great idea is *Virtual DOM*. In **React**, every DOM object has a corresponding virtual DOM object. As we all known, a web page usually has some interaction with users, so it needs to be updated if one action happens, but it would be pretty slow if we update every element in the page. Therefore, **React** uses virtual DOM. When an action happens, virtual DOM object gets updated, and then, React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update. This process is called "diffing". After this, React will know which virtual DOM objects have changed, and then updates those objects, *and only those objects*, on the real DOM. This idea is so cool!

![Virtual DOM](https://cdn.glitch.com/c343f923-f9cc-49fe-973f-2866c84f34e5%2Fvirtual%20DOM.jpg?v=1572213961398)

My second reason is, it's code style. Before I decided to use this framework, I explored some demo codes for Angular and Vue. But when I saw React, I really liked its code style. Therefore, I decided to pick this framework.

## What about that framework appealed to you, for this project?
I used to write back-end programs when I was an undergraduate student in college. Hence, thinking as a back-end programmer, I usually pay attention to how a framework handles different urls (Routers), how a framework handles RESTful APIs or some JSON formatted data, and how a framework work with forms. Therefore, I included all these three things in this project, and React performs pretty good and useful.

For routers, the configuration is very simple in React. React has two router components: *BrowserRouter* and *HashRouter*, the difference between them is that *HashRouter* uses the Hash part of url to sync (starts with #). I used the *BrowserRouter* in my project, and it uses the HTML5 history API to render the component.

For forms, React works very well. As I mentioned in the 1st question, React uses one-way data flow, users' interaction will trigger the actions, and actions will update the state, and state change will be passed back to the view, so views cannot change the data by themselves, but need to trigger the actions. In this way, it's less complex than two-ways data flow, and we can have more control over our data.

What's more, React can handle markdown files, and render them nicely. As a programmer, I often write markdown documents for my programs, so if I can directly render a markdown file to a web page rather than manually convert it into a HTML file, it could save me a bunch of time. And React performs very well. The source code displayed in my project is an example for this, with syntax highlighted, it looks beautiful.

Last but not least, React uses *components* to design UI, each page consists of many components, and change the component will affect all pages which contain that component. I think it is a very powerful way to update the web pages, and pretty easily to manage.

## What alternative frameworks did you consider?
Another framework I considered was Angular.

## What resources did you read/watch/listen to?
Some videos:

- A video about some foundations of React development: [https://www.linkedin.com/learning/learning-react-js-4?u=2252458](https://www.linkedin.com/learning/learning-react-js-4?u=2252458)
- A Chinese video of a real React APP project: [https://www.bilibili.com/video/av67503509?from=search&seid=16709433862044549486](https://www.bilibili.com/video/av67503509?from=search&seid=16709433862044549486)

Some articles:
- Shining points in React design (written in Chinese): [https://zhuanlan.zhihu.com/p/28562066](https://zhuanlan.zhihu.com/p/28562066)
- Unidirectional Data Flow in React: [https://flaviocopes.com/react-unidirectional-data-flow/](https://flaviocopes.com/react-unidirectional-data-flow)
- React routers: [https://reacttraining.com/react-router/web/api/BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter)
- React Markdown: [https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada](https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada)
- React Bootstrap: [https://react-bootstrap.github.io/getting-started/introduction](https://react-bootstrap.github.io/getting-started/introduction)


## Describe your project. What does it do? What components or features of the framework did you explore for this project?
My project demonstrates how to use React to develop web pages. My basic idea was to demonstrate how to use a framework to handle with routers, RESTful APIs, JSON formatted data and forms, but after I picked the React framework, I wrote it directly into a tutorial to teach myself how to use React, in case that I would forget in the future.

To make my project works in a proper way, there are couples of packages must be installed. The commands are:
```zsh
# Routers
$ npm install --save react-router-dom react-router-hash-link

# React Bootstrap
$ npm install --save react-bootstrap bootstrap

# Markdown supports
$ npm install --save raw-loader react-markdown prop-types react-syntax-highlighter
```

I configured some routers in my project, so visit the url can access the right resource. And I use Anchor for the *Routers* part (#routers-demo), it is achieved by `react-router-hash-link`. (You can visit AddressOne, and click 'Return to Homepage' to see how it works.)

For the "Read data from a JSON file" part, this is the part of what made me love this framework so much. First thing I need to do is to load the JSON file, and it's pretty simple: `import news from '../../assets/data/news';` (remember not to include the .json file extension here). Then I need to write the code for the results table:
```jsx
import React from 'react';
import news from '../../assets/data/news'; // import news.json, and don't include the json file extension here
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [];
for (const [i, el] of news.entries()) {
	if (i >= 10) break;
	data.push(
		// need to specify an unique key for the outermost element
		<tr key={el.docID}>
			<td className="d-none d-md-table-cell">{el.docID}</td>
			<td><a href={el.url}>{el.title}</a></td>
		</tr>
	);
}

export default class NewsItems extends React.Component {
	render() {
		return (
			<table>
				<thead>
				<tr>
					<th className="d-none d-md-table-cell" style={{textAlign: "center"}}>DocID</th>
					<th style={{textAlign: "center"}}>Title</th>
				</tr>
				</thead>
				<tbody>
				{data}
				</tbody>
			</table>
		)
	}
}
```
The next step is copying the code into a markdown file manually, and load it into the program. One thing needs to be noticed here is, for the code `import newItemsSourceCodePath from "./newItemsSourceCode.md";`, the variable `newItemsSourceCodePath` is a file path, not the markdown file. Therefore, I need to fetch the file through the path:
```jsx
export default class Home extends React.Component {
	...

	componentDidMount() {
		fetch(newItemsSourceCodePath).then((res) => res.text()).then((text) => {
			this.setState({newItemsSourceCode: text})
		});
	}

	...
}
```
and then render the markdown file:
```jsx
	...
	<ReactMarkdown
		source={this.state.newItemsSourceCode}
		escapeHtml={false}
		renderers={{
			code: CodeBlock
		}}
	/>
	...
```
Also, I wrote a form in the project. It's a pretty simple form, and after you click the *Submit* botton, the data you input will appear immediately in the next line under the botton.

## Breakpoints
I used both CSS @media rule and Bootstrap in my project.

The @media rules are used for changing the font size and margin size:
```css
@media (max-width: 1400px) {
    body {
        font-size: 16px;
        margin: 0.5em;
    }

    code {
        font-size: 15px;
    }
}

@media (max-width: 580px) {
    body {
        margin: 0;
    }
}
```

Bootstrap are used to change the table columns and size of input boxes.

The **DocID** table column only displays on screen which size is larger or equal than 768px.
```jsx
	...
	<tr>
		<th className="d-none d-md-table-cell" style={{textAlign: "center"}}>DocID</th>
		<th style={{textAlign: "center"}}>Title</th>
	</tr>
	...
```

And input boxes will change according to different screen sizes.
```jsx
	...
	<Col xl={4} lg={5} sm={12} className="px-0">
		<Form.Control name="email" type="email" placeholder="Enter email"
						onChange={this.changeHandler}/>
	</Col>
	...
	<Col xl={4} lg={5} sm={12} className="px-0">
		<Form.Control name="password" type="password" placeholder="Password"
						onChange={this.changeHandler}/>
	</Col>
	...
```