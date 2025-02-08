"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemixService = void 0;
const common_1 = require("@nestjs/common");
let RemixService = class RemixService {
    constructor() {
        this.data = [
            { id: 1, title: 'Premier élément' },
            { id: 2, title: 'Deuxième élément' },
        ];
    }
    async findAll() {
        return this.data;
    }
    async findOne(id) {
        return this.data.find(item => item.id === id);
    }
    async create(data) {
        const newItem = {
            id: this.data.length + 1,
            title: data.title,
        };
        this.data.push(newItem);
        return newItem;
    }
    getHello() {
        return 'Graig is a good boy!';
    }
};
exports.RemixService = RemixService;
exports.RemixService = RemixService = __decorate([
    (0, common_1.Injectable)()
], RemixService);
//# sourceMappingURL=remix.service.js.map