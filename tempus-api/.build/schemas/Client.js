"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var mongoose_1 = require("mongoose");
var clientSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    color: { type: String, required: true }
});
exports.Client = (0, mongoose_1.model)('Client', clientSchema);
//# sourceMappingURL=Client.js.map