import { Injectable } from '@nestjs/common';

export interface RemixItem {
  id: number;
  title: string;
}

@Injectable()
export class RemixService {
  private data: RemixItem[] = [
    { id: 1, title: 'Premier élément' },
    { id: 2, title: 'Deuxième élément' },
  ];

  async findAll(): Promise<RemixItem[]> {
    return this.data;
  }

  async findOne(id: number): Promise<RemixItem | undefined> {
    return this.data.find(item => item.id === id);
  }

  async create(data: { title: string }): Promise<RemixItem> {
    const newItem: RemixItem = {
      id: this.data.length + 1,
      title: data.title,
    };
    this.data.push(newItem);
    return newItem;
  }

  getHello(): string {
    return 'Graig is a good boy!';
  }
}
