"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./models/app"));
app_1.default.listen(5678, () => {
    console.log("Example app listening on port 5678!");
});
//# sourceMappingURL=server.js.map