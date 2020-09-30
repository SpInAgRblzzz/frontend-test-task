export type message = {
    id: number | string;
    text: string;
    canDelete: boolean;
    btcAmount?: number;
    messageType: string;
    messageContent: string | { source: string; amount: number }[];
    isService?: boolean;
    serviceAdded?: boolean;
};
