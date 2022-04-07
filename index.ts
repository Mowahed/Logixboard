require('dotenv').config();
import express from 'express';
import { getShipmentById, getTotalWeight, postShipment } from './routes/shipments';
import { getOrganizationById, postOrganization } from './routes/organizations';
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT;


app.post('/shipment', postShipment);

app.post('/organization', postOrganization);

app.get('/organizations/:organizationId', getOrganizationById);

app.get('/shipments/total-weight', getTotalWeight);

app.get('/shipments/:shipmentId', getShipmentById);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
