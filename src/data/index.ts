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


export const LOAN_DATA: LoanOffer[] = [
	{
		id: 'attijariwafa-bank',
		provider: 'Attijariwafa Bank',
		amount: 200000,
		interestRate: 4.2,
		durationYears: 20,
		monthlyPayment: 1233,
		totalCost: 295920,
		isRecommended:false,
	},
	{
		id: 'banque-populaire',
		provider: 'Banque Populaire',
		amount: 200000,
		interestRate: 3.9,
		durationYears: 20,
		monthlyPayment: 1197,
		totalCost: 287280,
		isRecommended: true,
	},
	{
		id: 'bank-of-africa-morocco',
		provider: 'Bank of Africa Morocco',
		amount: 200000,
		interestRate: 4.6,
		durationYears: 20,
		monthlyPayment: 1281,
		totalCost: 307440,
		isRecommended: false,

	},
	{
		id: 'cih-bank',
		provider: 'CIH Bank',
		amount: 200000,
		interestRate: 4.0,
		durationYears: 20,
		monthlyPayment: 1209,
		totalCost: 290160,
		isRecommended: false,
	},
];


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
			interestEarned:  Number(interestEarned.toFixed(2)),
			endingCapital:   Number(endingCapital.toFixed(2)),
		});

		currentCapital = endingCapital;
	}

	return results;
}

export const CAPITAL_GROWTH_SAMPLE = simulateCompoundGrowth(10000, 5, 10);