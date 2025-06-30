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
                update: (opts) => {
                    console.log(opts);
                    return set({
                        ...opts,
                    })
                },
                reset: () => set({
                    bcid: 'qrcode',
                    code: 'test',
                    color: '#000',
                    background: '#fff',
                }),
            }),
            {
                name: 'qr-generator-state',
            },
        ),
    ),
)