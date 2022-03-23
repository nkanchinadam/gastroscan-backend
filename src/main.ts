const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({limit: '50mb'}));

const tfjs = require("@tensorflow/tfjs");

app.get('/test_endpoint', async (req, res) => {
	const model = await tfjs.loadLayersModel('C:/Nitin/School/High School/TJHSST/Senior Year/Senior Research Lab/Website/gastroscan-backend/public/models/abnormality_model.json');
	console.log(typeof model);
	console.log('model', model);
	const tensor = tfjs.tensor(Array(100).fill(new Array(100).fill(new Array(3).fill(0))));
	console.log('tensor', tensor);
	const prediction = await model.predict(tensor);
	console.log(prediction);
});

app.post('/test_endpoint', (req, res) => {
	console.log(req.body);
});

app.post('/handle_file_upload', (req, res) => {
	console.log(req.body);
	res.send('ok');
});

try {
	app.listen(port, () => {
		console.log(`Running on [:${port}]`);
	});
} catch (e) {
	console.error(e);
}