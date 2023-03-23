"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEntry = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var mongoose_1 = require("mongoose");
var timeEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    clientId: { type: mongoose_1.Types.ObjectId, required: true },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (val) { return (0, dayjs_1.default)(val, 'MM/DD/YYYY', true).isValid(); }
        }
    },
    description: { type: String, required: true },
    length: { type: Number, required: true }
});
exports.TimeEntry = (0, mongoose_1.model)('TimeEntry', timeEntrySchema, 'time_entries');
//# sourceMappingURL=TimeEntry.js.map