import { motion } from "motion/react";
import type { LoanOffer } from "../data";
import { cn, formatCurrency } from "../utils";
import GrowthChart from "./GrowthChart";

type CreditOfferCardProps = {
  offer: LoanOffer;
  isExpanded: boolean;
  onToggle: () => void;
};

const BRAND_GRADIENTS: Record<string, string> = {
  "attijariwafa-bank":
    "linear-gradient(140deg, #211d1e 0%, #7d3e26 34%, #f0b300 68%, #ef483c 100%)",
  "bank-of-africa-morocco":
    "linear-gradient(130deg, #09457e 0%, #58a6b8 46%, #47b4aa 72%, #daeaee 100%)",
  "banque-populaire":
    "linear-gradient(135deg, #461604 0%, #e98300 44%, #f0a155 72%, #fadec8 100%)",
  "cih-bank":
    "linear-gradient(125deg, #060503 0%, #029cd1 44%, #f7d0bf 74%, #e6f3ed 100%)",
};

function CreditOfferCard({
  offer,
  isExpanded,
  onToggle,
}: CreditOfferCardProps) {
  const cardGradient =
    BRAND_GRADIENTS[offer.id] ??
    "linear-gradient(145deg, #dfe7ef 0%, #f6f8fb 100%)";

  return (
    <motion.article
      layout
      layoutId={`loan-offer-${offer.id}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 420,
          damping: 36,
          mass: 0.8,
        },
        opacity: { duration: 0.18 },
        y: { duration: 0.18 },
      }}
      className={cn(
        "offer-card relative z-0 overflow-hidden border border-border/80 bg-card/95 shadow-sm gradient-card",
        isExpanded
          ? "fixed inset-0 z-50 h-dvh w-screen rounded-none border-0 shadow-none"
          : "cursor-pointer rounded-xl",
      )}
      onClick={isExpanded ? undefined : onToggle}
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

      <div
        className={cn(
          "relative z-10 flex h-full flex-col",
          isExpanded ? "p-6 sm:p-8 lg:p-10" : "p-5",
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Provider
            </p>
            <h2 className="font-serif text-2xl leading-tight text-card-foreground sm:text-3xl">
              {offer.provider}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {offer.isRecommended ? (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Recommended
              </span>
            ) : null}
            {isExpanded ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggle();
                }}
                className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm transition-colors hover:bg-background"
              >
                Close
              </button>
            ) : null}
          </div>
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

        {isExpanded ? (
          <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col gap-4 overflow-y-auto rounded-3xl border border-border/60 bg-background/70 p-4 text-sm text-foreground/90 sm:p-5">
              <div id={`offer-details-${offer.id}`} className="grid gap-3">
                <p>
                  Duration: <strong>{offer.durationYears} years</strong>
                </p>
                <p>
                  Monthly payment:{" "}
                  <strong>{formatCurrency(offer.monthlyPayment)}</strong>
                </p>
                <p>
                  Total cost: <strong>{formatCurrency(offer.totalCost)}</strong>
                </p>
              </div>
            </div>

            <GrowthChart offer={offer} />
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggle();
              }}
              className="rounded-full border border-primary/20 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              See details
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default CreditOfferCard
