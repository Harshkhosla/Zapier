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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'Harshkhosla9945@gmail.com',
        pass: 'smos vryu mccy rhqp',
    },
});
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield transport.sendMail({
            from: "Harshkhosla9945@gmail.com",
            sender: "contact@100xdevs.com",
            to,
            subject: "Hello from Zapier",
            text: body
        });
    });
}
