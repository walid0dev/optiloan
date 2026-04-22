import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CreditOfferCard from "./components/CreditOfferCard";
import { LOAN_DATA, type LoanOffer } from "./data";

const DEFAULT_OFFER_ID = null;

function App() {
  const [currentExpandedOfferId, setExpandedOfferId] = useState<string | null>(
    DEFAULT_OFFER_ID,
  );
  const expandedOffer =
    LOAN_DATA.find((offer) => offer.id === currentExpandedOfferId) ?? null;

  useEffect(() => {
    document.body.style.overflow = expandedOffer ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedOffer]);

  
  const handleToggleOffer = (offerId:string) => {
    setExpandedOfferId(currentExpandedOfferId === offerId ? null : offerId);
  };

  return (
    <div className="app-shell min-h-screen px-6 py-10 sm:px-8 lg:px-12">
      <div className="ambient-glow" aria-hidden="true" />
      <AnimatePresence>
        {expandedOffer ? (
          <motion.div
            key="loan-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            OptiLoan Planner
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            Compare Loan Offers With Precision
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Select any offer to inspect full repayment details and quickly spot
            the most efficient rate.
          </p>
          {expandedOffer ? (
            <p className="text-sm text-foreground/80">
              Currently viewing details for{" "}
              <strong>{expandedOffer.provider}</strong>.
            </p>
          ) : null}
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
    </div>
  );
}

export default App;
