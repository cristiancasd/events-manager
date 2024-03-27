"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defautlDbConfig = exports.initializedDbErrorMessage = exports.initializedDbMessage = exports.modelsFilesRoutes = void 0;
exports.modelsFilesRoutes = '../features/**/infrastructure/models/*.dto.ts';
exports.initializedDbMessage = 'Data Source has been initialized';
exports.initializedDbErrorMessage = 'Data Source initialization error';
var defautlDbConfig;
(function (defautlDbConfig) {
    defautlDbConfig["postgres"] = "postgres";
    defautlDbConfig["host"] = "tu_host";
    defautlDbConfig[defautlDbConfig["port"] = 5432] = "port";
    defautlDbConfig["username"] = "tu_usuario";
    defautlDbConfig["password"] = "tu_contrase\u00F1a";
})(defautlDbConfig || (exports.defautlDbConfig = defautlDbConfig = {}));
