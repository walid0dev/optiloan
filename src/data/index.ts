export type LoanOffer = {
	id: string;
	provider: string;
	amount: number;
	interestRate: number;
	durationYears: number;
	monthlyPayment: number;
	totalCost: number;
	isRecommended: boolean;
};

type LoanOfferSeed = Omit<LoanOffer, 'isRecommended'>;

const LOAN_DATA_SEED: LoanOfferSeed[] = [
	{
		id: 'northstar-bank',
		provider: 'Northstar Bank',
		amount: 200000,
		interestRate: 4.2,
		durationYears: 20,
		monthlyPayment: 1233,
		totalCost: 295920,
	},
	{
		id: 'harbor-credit',
		provider: 'Harbor Credit Union',
		amount: 200000,
		interestRate: 3.9,
		durationYears: 20,
		monthlyPayment: 1197,
		totalCost: 287280,
	},
	{
		id: 'summit-finance',
		provider: 'Summit Finance',
		amount: 200000,
		interestRate: 4.6,
		durationYears: 20,
		monthlyPayment: 1281,
		totalCost: 307440,
	},
	{
		id: 'riverbank-lending',
		provider: 'Riverbank Lending',
		amount: 200000,
		interestRate: 4.0,
		durationYears: 20,
		monthlyPayment: 1209,
		totalCost: 290160,
	},
];

const lowestRate = Math.min(...LOAN_DATA_SEED.map((offer) => offer.interestRate));

export const LOAN_DATA: LoanOffer[] = LOAN_DATA_SEED.map((offer) => ({
	...offer,
	isRecommended: offer.interestRate === lowestRate,
}));

export type GrowthPoint = {
	year: number;
	startingCapital: number;
	interestEarned: number;
	endingCapital: number;
};

export function simulateCompoundGrowth(
	initialCapital: number,
	annualRatePercent: number,
	years: number,
): GrowthPoint[] {
	const results: GrowthPoint[] = [];
	let currentCapital = initialCapital;

	for (let year = 1; year <= years; year += 1) {
		const interestEarned = currentCapital * (annualRatePercent / 100);
		const endingCapital = currentCapital + interestEarned;

		results.push({
			year,
			startingCapital: Number(currentCapital.toFixed(2)),
			interestEarned: Number(interestEarned.toFixed(2)),
			endingCapital: Number(endingCapital.toFixed(2)),
		});

		currentCapital = endingCapital;
	}

	return results;
}

export const CAPITAL_GROWTH_SAMPLE = simulateCompoundGrowth(10000, 5, 10);