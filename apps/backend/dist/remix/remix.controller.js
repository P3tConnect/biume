"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemixController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("@remix-run/express");
const remix_service_1 = require("./remix.service");
const shared_1 = require("@monorepo/shared");
let RemixController = class RemixController {
    constructor(remixService) {
        this.remixService = remixService;
    }
    async handler(request, response, next) {
        return (0, express_1.createRequestHandler)({
            build: await (0, shared_1.getServerBuild)(),
            getLoadContext: () => ({
                remixService: this.remixService,
            }),
        })(request, response, next);
    }
};
exports.RemixController = RemixController;
__decorate([
    (0, common_1.All)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], RemixController.prototype, "handler", null);
exports.RemixController = RemixController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [remix_service_1.RemixService])
], RemixController);
//# sourceMappingURL=remix.controller.js.map