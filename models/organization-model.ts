import mongooseDB from "../mongodb";

const schema = new mongooseDB.Schema({
    id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongooseDB.model("organization", schema);
