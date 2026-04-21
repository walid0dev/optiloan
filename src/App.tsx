import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CreditOfferCard from './components/CreditOfferCard';
import {
  LOAN_DATA,
  simulateCompoundGrowth,
  type LoanOffer,
} from './data';
import { i } from 'motion/react-client';

function App() {
  const [expandedOfferId, setExpandedOfferId] = useState<string | null>(
    LOAN_DATA.find((offer) => offer.isRecommended)?.id ?? LOAN_DATA[0]?.id ?? null,
  );
i










 
  const expandedOffer = useMemo(
    () => LOAN_DATA.find((offer) => offer.id === expandedOfferId) ?? null,
    [expandedOfferId],
  );

  const selectedOffer = useMemo(
    () => expandedOffer ?? LOAN_DATA.find((offer) => offer.isRecommended) ?? LOAN_DATA[0],
    [expandedOffer],
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(value);

  const handleToggleOffer = (offer: LoanOffer) => {
    setExpandedOfferId((currentId) => (currentId === offer.id ? null : offer.id));
  };

  const growthSeries = useMemo(
    () =>
      simulateCompoundGrowth(
        selectedOffer.amount,
        selectedOffer.interestRate,
        selectedOffer.durationYears,
      ),
    [selectedOffer.amount, selectedOffer.durationYears, selectedOffer.interestRate],
  );

  const finalGrowthPoint = growthSeries[growthSeries.length - 1];

  return (
    <div className="app-shell min-h-screen px-6 py-10 sm:px-8 lg:px-12">
      <div className="ambient-glow" aria-hidden="true" />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            OptiLoan Planner
          </p>
          <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            Compare Loan Offers With Precision
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Select any offer to inspect full repayment details and quickly spot the
            most efficient rate.
          </p>
          {expandedOffer ? (
            <p className="text-sm text-foreground/80">
              Currently viewing details for <strong>{expandedOffer.provider}</strong>.
            </p>
          ) : null}
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {LOAN_DATA.map((offer, index) => (
            <CreditOfferCard
              key={offer.id}
              offer={offer}
              isExpanded={expandedOfferId === offer.id}
              onToggle={() => handleToggleOffer(offer)}
              formatCurrency={formatCurrency}
              index={index}
            />
          ))}
        </section>

        <section className="growth-panel rounded-xl border border-border/80 bg-card/90 p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl text-card-foreground">
              Compound Growth Simulation
            </h2>
            <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {selectedOffer.provider}
            </span>
          </div>
          <div className="h-72 rounded-lg border border-border/70 bg-background/60 p-3 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthSeries}
                margin={{ top: 8, right: 18, left: 6, bottom: 8 }}
              >
                <defs>
                  <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0.92} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 6" />
                <XAxis
                  dataKey="year"
                  stroke="var(--color-muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                  tickMargin={10}
                  width={42}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ stroke: 'var(--color-chart-3)', strokeDasharray: '4 5' }}
                  contentStyle={{
                    borderRadius: 10,
                    border: '1px solid var(--color-border)',
                    background: 'color-mix(in oklab, var(--color-background) 94%, white)',
                  }}
                  formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Ending capital']}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="endingCapital"
                  stroke="url(#growthLine)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: 'var(--color-chart-3)', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <p className="rounded-lg border border-border/70 bg-background/65 px-3 py-2 text-foreground/85">
              Initial: <strong>{formatCurrency(selectedOffer.amount)}</strong>
            </p>
            <p className="rounded-lg border border-border/70 bg-background/65 px-3 py-2 text-foreground/85">
              Rate: <strong>{selectedOffer.interestRate.toFixed(1)}% / year</strong>
            </p>
            <p className="rounded-lg border border-border/70 bg-background/65 px-3 py-2 text-foreground/85">
              Final year {selectedOffer.durationYears}:{' '}
              <strong>
                {finalGrowthPoint ? formatCurrency(finalGrowthPoint.endingCapital) : 'n/a'}
              </strong>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
