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
Object.defineProperty(exports, "__esModule", { value: true });
// start.ts
require("dotenv/config");
const app_1 = require("./src/app");
const database_1 = require("./src/database");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.connectDB.initialize();
    const port = process.env.PORT || 8070;
    app_1.app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
});
start();
