import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SkuItem extends Record<string, string> {
    name: string;
    id: string;
}

interface SKUActions {
    addItem: (item: SkuItem) => void;
    removeItem: (itemId: string) => void;
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
                    const items = [...current].concat(item);

                    set({ items });
                },
                removeItem: (itemId: string) => {
                    const items = [...get().items].filter(item => item.id !== itemId);

                    set({ items });
                },
            }),
            {
                name: 'sku-generator-state',
            },
        ),
    ),
)