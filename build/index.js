"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/health', (req, res) => res.send());
app.post('/upload', (req, res) => {
    // Upload image
});
app.patch('/confirm', (req, res) => {
    // Confirm medition
});
app.get('/:customerCode/list', (req, res) => {
    res.send(`List of meditions for customer ${req.params.customerCode}`);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
