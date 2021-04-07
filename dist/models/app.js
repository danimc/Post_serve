"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const app = express_1.default();
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
app.get('/api/posts', [], post_controller_1.getPosts);
exports.default = app;
//# sourceMappingURL=app.js.map