import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { SupportedBCID } from '../bcid'

interface QRActions {
    update: (options: Partial<QRState>) => void;
    reset: () => void;
}

interface QRState {
    bcid: SupportedBCID;
    code: string;
    color: string;
    background: string;
    state: 'init' | 'edited';
}

type QRStore = QRState & QRActions;

export const useQRStore = create<QRStore>()(
    devtools(
        persist(
            (set) => ({
                bcid: 'qrcode',
                code: 'test',
                color: '#000',
                background: '#fff',
                state: 'init',
                update: (opts) => {
                    return set({
                        ...opts,
                        state: 'edited',
                    })
                },
                reset: () => set({
                    bcid: 'qrcode',
                    code: 'test',
                    color: '#000',
                    background: '#fff',
                    state: 'init',
                }),
            }),
            {
                name: 'qr-generator-state',
            },
        ),
    ),
)