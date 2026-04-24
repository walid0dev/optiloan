import { useState } from 'react';
import CreditOfferCard from './components/CreditOfferCard';
import { LOAN_DATA } from './data';
import InterestGrowthTable from './components/InterestGrowthTable';

function App() {
    const [currentExpandedOfferId, setExpandedOfferId] = useState<
        string | null
    >(null);
    const handleToggleOffer = (offerId: string) => {
        setExpandedOfferId(currentExpandedOfferId === offerId ? null : offerId);
    };

    return (
        <div className="app-shell min-h-screen px-6 py-8 sm:px-8 lg:px-12">
            <div className="ambient-glow" />
            <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
                <header className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        OptiLoan Planner
                    </p>
                    <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                        Compare Loan Offers With Precision
                    </h1>
                    <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                        Select any offer to inspect full repayment details and
                        quickly spot the most efficient rate.
                    </p>
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                    {LOAN_DATA.map((offer) => (
                        <CreditOfferCard
                            key={offer.id}
                            offer={offer}
                            isExpanded={currentExpandedOfferId === offer.id}
                            onToggle={() => handleToggleOffer(offer.id)}
                        />
                    ))}
                </section>
            </main>
            <InterestGrowthTable />
        </div>
    );
}

export default App;
