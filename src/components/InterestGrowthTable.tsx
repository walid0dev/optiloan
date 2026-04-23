import { useCallback, type ChangeEventHandler } from 'react';

const InterestGrowthTable = () => {
    return (
        <div className="my-4">
            <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Compound intrest simulator
            </h1>
            <div className="flex gap-x-8 py-4 ">
                <Slider
                    label="amount"
                    onChange={(v) => {
                        console.log(v);
                    }}
                />
                <Slider
                    label="intrest rate"
                    onChange={(v) => {
                        console.log(v);
                    }}
                />
                <Slider
                    label="duration"
                    onChange={(v) => {
                        console.log(v);
                    }}
                />
            </div>
        </div>
    );
};
type SliderProps = {
    onChange: (value: number) => void;
    label: string;
};
function Slider({ onChange, label }: SliderProps) {
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (ev) => {
            const value = Number((ev.target as HTMLInputElement).value);
            onChange(value);
        },
        [onChange]
    );

    return (
        <div className=" flex gap-x-4 ">
            <label className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                {label}
            </label>
            <input
                className="cursor-pointer accent-chart-3"
                type="range"
                onChange={handleChange}
            />
        </div>
    );
}

export default InterestGrowthTable;
