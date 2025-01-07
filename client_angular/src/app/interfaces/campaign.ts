export interface Campaign {
    campaignId: number;
    title: string;
    description: string;
    fundRaised: number;
    targetAmount: number;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'FULFILLED' | 'ENDED';
    icon?: string;
  }
  