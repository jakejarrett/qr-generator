import type { SupportedBCID } from '@/bcid';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface SkuItem {
    name: string;
    sku: string
    description: string;
    codeType?: SupportedBCID;
}

interface SKUActions {
    addItem: (item: SkuItem) => void;
    addItems: (items: SkuItem[]) => void;
    updateItem: (sku: string, updatedItem: Partial<SkuItem>) => void;
    getItem: (sku: string) => SkuItem | undefined;
    getItems: () => SkuItem[];
    clearItems: () => void;
    removeItem: (sku: string) => void;
}

interface SKUState {
    items: SkuItem[];
}

type SKUStore = SKUState & SKUActions;

export const useSKUStore = create<SKUStore>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                addItem: (item) => {
                    const current = get().items;
                    const existingItem = current.find(i => i.sku === item.sku);
                    if (existingItem) {
                        console.warn(`Item with SKU ${item.sku} already exists.`);
                        return;
                    }
                    const items = [...current].concat(item);

                    set({ items });
                    window.dispatchEvent(new StorageEvent('storage'));
                },
                removeItem: (sku: string) => {
                    const items = [...get().items].filter(item => item.sku !== sku);

                    set({ items });
                    window.dispatchEvent(new StorageEvent('storage'));
                },
                addItems: (items) => {
                    const current = get().items;
                    const newItems = items.filter(item => !current.some(i => i.sku === item.sku));

                    if (newItems.length === 0) {
                        console.warn("No new items to add.");
                        return;
                    }

                    set({ items: [...current, ...newItems] });
                    window.dispatchEvent(new StorageEvent('storage'));

                },
                updateItem: (itemId, updatedItem) => {
                    const items = get().items.map(item => (item.sku === itemId ? { ...item, ...updatedItem } : item) as SkuItem);
                    set({ items });
                    window.dispatchEvent(new StorageEvent('storage'));
                },
                getItem: (itemId) => {
                    return get().items.find(item => item.sku === itemId);
                },
                getItems: () => get().items,
                clearItems: () => {
                    set({ items: [] });
                    window.dispatchEvent(new StorageEvent('storage'));
                }
            }),
            {
                name: 'sku-generator-state',
            },
        ),
    ),
)