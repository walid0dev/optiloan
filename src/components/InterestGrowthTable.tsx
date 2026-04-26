import { useCallback, useState, type ChangeEventHandler } from 'react';
import { formatCurrency } from '../utils';
import { simulateCompoundGrowth } from '../data';
import { type GrowthPoint } from '../data';

const InterestGrowthTable = () => {
    const [amount, setAmount] = useState(0);
    const [rate, setRate] = useState(4);
    const [duration, setDuration] = useState(0);
    const data = simulateCompoundGrowth(amount, rate, duration);
    return (
        <div className="my-12 px-12">
            <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Simulate Compound Interest
            </h1>
            <div className="flex gap-x-16 py-4 px-2">
                <Slider
                    start={0}
                    limit={200_000}
                    step={10_000}
                    formater={formatCurrency}
                    label="amount"
                    onChange={(v) => {
                        setAmount(v);
                    }}
                />
                <Slider
                    start={0}
                    limit={10}
                    step={0.1}
                    formater={(rate) => `${rate}%`}
                    initial={4}
                    label="intrest rate"
                    onChange={(v) => {
                        setRate(v);
                    }}
                />
                <Slider
                    start={1}
                    formater={(v) => `${v} years`}
                    limit={20}
                    label="duration"
                    onChange={(v) => {
                        setDuration(v);
                    }}
                />
            </div>
            <div>
                <Table data={data} />
            </div>
        </div>
    );
};
type SliderProps = {
    onChange: (value: number) => void;
    label: string;
    start: number;
    limit: number;
    step?: number;
    initial?: number;
    formater?: (value: number) => string;
};
function Slider({
    onChange,
    label,
    start,
    limit,
    step = 1,
    initial = 0,
    formater,
}: SliderProps) {
    const [inputValue, setInputValue] = useState(initial);
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (ev) => {
            const value = Number((ev.target as HTMLInputElement).value);
            setInputValue(value);
            onChange(value);
        },
        [onChange]
    );

    return (
        <div className=" flex gap-y-6 flex-col py-2">
            <label className="max-w-2xl flex gap-x-2 text-xl text-muted-foreground ">
                {label} :{' '}
                <p className="font-bold text-foreground w-22 ">
                    {formater ? formater(inputValue) : inputValue}
                </p>
            </label>
            <input
                min={start}
                step={step}
                max={limit}
                className="cursor-pointer accent-chart-3 w-full "
                type="range"
                onChange={handleChange}
                value={inputValue}
            />
        </div>
    );
}

type TableProps = {
    data: GrowthPoint[];
};
function Table({ data }: TableProps) {
    return (
        <div className="relative flex flex-col w-full overflow-y-hidden border border-border rounded-lg bg-card shadow-sm">
            <table className="w-full text-left table-auto">
                <thead className="sticky top-0 z-10">
                    <tr className="border-b border-border bg-secondary">
                        <th className="px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Year
                            </p>
                        </th>
                        <th className="px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Starting Capital
                            </p>
                        </th>
                        <th className="px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Interest Earned
                            </p>
                        </th>
                        <th className="px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Ending Capital
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-4 py-8 text-center text-muted-foreground"
                            >
                                No data to display. Adjust the sliders above.
                            </td>
                        </tr>
                    ) : (
                        data.map((point, index) => (
                            <tr
                                key={index}
                                className="border-b border-border hover:bg-secondary/20 transition-colors"
                            >
                                <td className="px-4 py-3 text-sm font-medium text-foreground">
                                    {point.year}
                                </td>
                                <td className="px-4 py-3 text-sm text-foreground">
                                    {formatCurrency(point.startingCapital)}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-chart-3">
                                    {formatCurrency(point.interestEarned)}
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold text-foreground">
                                    {formatCurrency(point.endingCapital)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InterestGrowthTable;
