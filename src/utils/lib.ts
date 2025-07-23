import { useEffect, useState } from "react";

import type { SkuItem } from "@/store/sku.store";

export const getSKUList = (): SkuItem[] => {
    const details = localStorage.getItem("sku-generator-state");

    try {
        if (!details) {
            return [];
        }

        console.log(details);

        const parsed = JSON.parse(details);

        return parsed?.state?.items as SkuItem[];
    } catch (error) {
        console.error("Error parsing SKU list from localStorage:", error);
        return [];
    }
};

export const useSKUList = () => {
    const [details, setDetails] = useState<SkuItem[]>([]);

    useEffect(() => {
        setDetails(getSKUList());

        const onStorage = () => {
            setDetails(getSKUList());
        }

        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('storage', onStorage);
        }
    }, []);

    return details;
};