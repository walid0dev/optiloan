import { memo, useMemo } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { LoanOffer } from '../data';
import { simulateCompoundGrowth } from '../data';
import { formatCurrency } from '../utils';

type GrowthChartProps = {
    offer: LoanOffer;
};

function GrowthChart({ offer }: GrowthChartProps) {
    const growthSeries = useMemo(
        () =>
            simulateCompoundGrowth(
                offer.amount,
                offer.interestRate,
                offer.durationYears
            ),
        [offer.amount, offer.interestRate, offer.durationYears]
    );

 
    return (
        <div className="h-full min-h-80 rounded-3xl border border-border/60 bg-card/70 p-4  sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Compound interest growth
                </p>
                <span className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {offer.durationYears} years
                </span>
            </div>
            <div className="h-[calc(100%-2.75rem)] min-h-72 rounded-3xl border border-dashed border-border/60 bg-background/60 p-3 sm:p-4">
                <ResponsiveContainer width="100%" height="100%" >
                    <LineChart
                    
                        data={growthSeries}
                        margin={{ top: 8, right: 18, left: 6, bottom: 8 }}
                    >
                        <defs>
                            <linearGradient
                                id={`growthLine-${offer.id}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-chart-2)"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--color-chart-4)"
                                    stopOpacity={0.92}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            stroke="var(--color-border)"
                            strokeDasharray="4 6"
                        />
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
                            tickFormatter={(value) =>
                                `${Math.round(Number(value) / 1000)}k`
                            }
                            tickMargin={10}
                            width={42}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{
                                stroke: 'var(--color-chart-3)',
                                strokeDasharray: '4 5',
                            }}
                            contentStyle={{
                                borderRadius: 10,
                                border: '1px solid var(--color-border)',
                                background:
                                    'color-mix(in oklab, var(--color-background) 94%, white)',
                            }}
                            formatter={(value) => [
                                formatCurrency(Number(value ?? 0)),
                                'Ending capital',
                            ]}
                            labelFormatter={(label) => `Year ${label}`}
                        />
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="endingCapital"
                            stroke={`url(#growthLine-${offer.id})`}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: 'var(--color-chart-3)',
                                strokeWidth: 0,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default memo(GrowthChart);