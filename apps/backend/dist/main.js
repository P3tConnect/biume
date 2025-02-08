"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const shared_1 = require("@monorepo/shared");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
    });
    await (0, shared_1.startDevServer)(app);
    app.useStaticAssets((0, shared_1.getPublicDir)(), {
        immutable: true,
        maxAge: '1y',
        index: false,
    });
    const selectedPort = process.env.PORT ?? 3000;
    console.log(`Running on port http://localhost:${selectedPort}`);
    await app.listen(selectedPort);
}
bootstrap();
//# sourceMappingURL=main.js.map