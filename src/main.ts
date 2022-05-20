const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
const fetch = require("node-fetch");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({limit: '50mb'}));

app.post('/handle_file_upload', async (req, res) => {
	const pixels = req.body.pixels;
	const result = await fetch('http://localhost:5000/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			tensor: [pixels],
			modelType: req.body.modelType
		})
	});
	const response = await result.json();
	res.send(response);
});

try {
	app.listen(port, () => {
		console.log(`Running on [:${port}]`);
	});
} catch (e) {
	console.error(e);
}