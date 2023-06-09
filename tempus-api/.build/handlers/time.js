"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serverless_http_1 = __importDefault(require("serverless-http"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var dayjs_1 = __importDefault(require("dayjs"));
var db_1 = require("../services/db");
var TimeEntry_1 = require("../schemas/TimeEntry");
var Client_1 = require("../schemas/Client");
var app = (0, express_1.default)();
(0, db_1.connectDb)();
app.get('/time', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var time, entriesPerDay, time_1, time_1_1, entry;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, TimeEntry_1.TimeEntry.find()];
            case 1:
                time = _b.sent();
                entriesPerDay = {};
                try {
                    for (time_1 = __values(time), time_1_1 = time_1.next(); !time_1_1.done; time_1_1 = time_1.next()) {
                        entry = time_1_1.value;
                        if (!entriesPerDay[entry.date]) {
                            entriesPerDay[entry.date] = [];
                        }
                        entriesPerDay[entry.date].push(entry);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (time_1_1 && !time_1_1.done && (_a = time_1.return)) _a.call(time_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.status(200).json(entriesPerDay);
                return [2 /*return*/];
        }
    });
}); });
app.post('/time', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, minDate, maxDate, clientIds, names, colors, i, result, i, rand, clientId, client, time, date;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Post 1000 transactions for 5 clients
                console.log('inserting clients and time');
                userId = new mongoose_1.Types.ObjectId();
                minDate = (0, dayjs_1.default)().subtract(3, 'month').unix();
                maxDate = (0, dayjs_1.default)().unix();
                clientIds = [];
                names = ['Facebook', 'Apple', 'Amazon', 'Netflix', 'Google'];
                colors = ['#3b5998', '#66b447', '#FF9900', '#E50914', '#f4c20d'];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 4];
                return [4 /*yield*/, Client_1.Client.create({
                        userId: userId,
                        name: names[i],
                        active: true,
                        color: colors[i]
                    })];
            case 2:
                result = _a.sent();
                clientIds.push(result.id);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 1000)) return [3 /*break*/, 8];
                rand = Math.floor(Math.random() * 5);
                clientId = clientIds[rand];
                client = names[rand];
                time = (Math.random() * 8).toFixed(1);
                date = dayjs_1.default.unix(Math.floor(Math.random() * (maxDate - minDate) + minDate)).format('MM/DD/YYYY');
                return [4 /*yield*/, TimeEntry_1.TimeEntry.create({
                        userId: userId,
                        clientId: clientId,
                        date: date,
                        description: "Charged ".concat(time, " hours to ").concat(client),
                        length: time
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                res.status(200).send({ message: 'Success!' });
                return [2 /*return*/];
        }
    });
}); });
module.exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=time.js.map