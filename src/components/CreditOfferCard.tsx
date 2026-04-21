import type { LoanOffer } from '../data';
import { cn } from '../utils';

type CreditOfferCardProps = {
    offer: LoanOffer;
    isExpanded: boolean;
    onToggle: () => void;
    formatCurrency: (value: number) => string;
    index?: number;
};

const BRAND_GRADIENTS: Record<string, string> = {
    'attijariwafa-bank':
        'linear-gradient(140deg, #211d1e 0%, #7d3e26 34%, #f0b300 68%, #ef483c 100%)',
    'bank-of-africa-morocco':
        'linear-gradient(130deg, #09457e 0%, #58a6b8 46%, #47b4aa 72%, #daeaee 100%)',
    'banque-populaire':
        'linear-gradient(135deg, #461604 0%, #e98300 44%, #f0a155 72%, #fadec8 100%)',
    'cih-bank':
        'linear-gradient(125deg, #060503 0%, #029cd1 44%, #f7d0bf 74%, #e6f3ed 100%)',
};

export default function CreditOfferCard({
    offer,
    isExpanded,
    onToggle,
    formatCurrency,
    index = 0,
}: CreditOfferCardProps) {
    const cardGradient =
        BRAND_GRADIENTS[offer.id] ??
        'linear-gradient(145deg, #dfe7ef 0%, #f6f8fb 100%)';

    return (
        <article
            className={cn(
                'offer-card relative overflow-hidden rounded-xl border border-border/80 bg-card/95 p-5 z-0 shadow-sm transition-all',
                isExpanded
                    ? 'border-primary/40 shadow-md'
                    : 'hover:-translate-y-0.5 hover:shadow-md',
                'gradient-card'
            )}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ backgroundImage: cardGradient }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-background/60 backdrop-blur-[1px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-linear-to-b from-white/45 to-transparent"
                aria-hidden="true"
            />

            <div className="relative z-10">
                <button
                    type="button"
                    onClick={onToggle}
                    className="w-full text-left cursor-pointer"
                    aria-expanded={isExpanded}
                    aria-controls={`offer-details-${offer.id}`}
                >
                    <div className="mb-5 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                Provider
                            </p>
                            <h2 className="font-serif text-2xl leading-tight text-card-foreground">
                                {offer.provider}
                            </h2>
                        </div>
                        {offer.isRecommended ? (
                            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                Recommended
                            </span>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-secondary/55 p-3">
                            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                Loan amount
                            </p>
                            <p className="text-lg font-semibold text-card-foreground">
                                {formatCurrency(offer.amount)}
                            </p>
                        </div>
                        <div className="rounded-lg bg-secondary/55 p-3">
                            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                Interest rate
                            </p>
                            <p className="text-lg font-semibold text-card-foreground">
                                {offer.interestRate.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </button>

                <div
                    id={`offer-details-${offer.id}`}
                    className={cn(
                        'grid transition-all duration-300 ease-out',
                        isExpanded
                            ? 'mt-5 grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="space-y-2 rounded-lg border border-border/60 bg-background/70 p-3 text-sm text-foreground/90">
                            <p>
                                Duration:{' '}
                                <strong>{offer.durationYears} years</strong>
                            </p>
                            <p>
                                Monthly payment:{' '}
                                <strong>
                                    {formatCurrency(offer.monthlyPayment)}
                                </strong>
                            </p>
                            <p>
                                Total cost:{' '}
                                <strong>
                                    {formatCurrency(offer.totalCost)}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
