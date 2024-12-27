export interface Campaign {
    campaignId: number;
    title: string;
    description: string;
    fundRaised: string;
    targetAmount: string;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'FULFILLED' | 'ENDED';
    icon?: string;
}