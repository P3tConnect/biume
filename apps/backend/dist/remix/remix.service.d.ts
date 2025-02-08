export interface RemixItem {
    id: number;
    title: string;
}
export declare class RemixService {
    private data;
    findAll(): Promise<RemixItem[]>;
    findOne(id: number): Promise<RemixItem | undefined>;
    create(data: {
        title: string;
    }): Promise<RemixItem>;
    getHello(): string;
}
