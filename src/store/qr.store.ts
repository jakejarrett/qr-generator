import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { SupportedBCID } from '../bcid'

interface QRActions {
    update: (options: Partial<QRState>) => void;
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
                code: '',
                color: '#000',
                background: '#fff',
                update: (opts) => {
                    console.log(opts);
                    return set({
                        ...opts,
                    })
                },
            }),
            {
                name: 'qr-generator-state',
            },
        ),
    ),
)