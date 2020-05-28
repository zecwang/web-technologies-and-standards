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