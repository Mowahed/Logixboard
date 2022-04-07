const Shipment = require('../models/shipment-model')
const convert = require('convert-units')

export const getShipmentById = async (req: any, res: any) => {
    const shipmentId = req.params.shipmentId;
    try {
        const shipment = await Shipment.findById(shipmentId);
        if (shipment) {
            return res.json(shipment)
        } else {
            return res.status(404).json({ message: 'Shipment not found!' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

export const getTotalWeight = async (req: any, res: any) => {
    const unit = req.query.unit;
    if (!unit) return res.status(400).json({ message: 'unit query parameter required!' });
    const units = ['kg', 'lb', 'oz'];
    if (!units.includes(unit)) return res.status(400).json({ message: 'Unit has to be in kg, lb or oz!' });


    try {
        const shipments = await Shipment.find();

        const nodes = shipments.filter((shipment: any) => shipment.transportPacks?.nodes.length > 0)
            .map((node: any) => node.transportPacks.nodes);

        let total = 0;

        nodes.forEach((node: any) => {
            node.forEach((item: any) => {
                const weight = item.totalWeight.weight;
                switch (item.totalWeight.unit) {
                    case 'KILOGRAMS':
                        total += Number(convert(weight).from('kg').to(unit));
                        break;
                    case 'OUNCES':
                        total += Number(convert(weight).from('oz').to(unit));
                        break;
                    case 'POUNDS':
                        total += Number(convert(weight).from('lb').to(unit));
                        break;
                }
            })
        })

        return res.status(200).json({
            unit: unit,
            totalWeight: total
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const postShipment = async (req: any, res: any) => {
    const shipment = new Shipment(req.body)

    try {
        const savedShipment = await shipment.save()
        res.status(201).json(savedShipment)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};