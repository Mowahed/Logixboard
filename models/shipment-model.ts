import mongooseDB from "../mongodb";

const schema = new mongooseDB.Schema({
   referenceId: {
      type: String,
      required: true
   },
   organizations: {
      type: Array,
      Default: []
   },
   estimatedTimeArrival: {
      type: Date
   },
   transportPacks: {
      nodes: [
         {
            totalWeight: {
               weight: String,
               unit: String
            },
            _id: false
         }
      ]
   }
});

module.exports = mongooseDB.model("shipment", schema);
