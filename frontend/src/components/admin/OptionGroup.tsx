type OptionGroupProps<T> = {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  swatch?: boolean;
  labels?: Partial<Record<string, string>>;
};

export function OptionGroup<T>({
  legend,
  options,
  value,
  onChange,
  disabled = false,
  swatch = false,
  labels,
}: OptionGroupProps<T>) {
  return (
    <fieldset className="ops-fieldset" disabled={disabled}>
      <legend className="ops-kicker">{legend}</legend>
      <div className="ops-options" role="group" aria-label={legend}>
        {options.map((option) => {
          const label = String(option);
          return (
            <button
              key={label}
              type="button"
              className={`ops-option${value === option ? ' is-selected' : ''}`}
              onClick={() => onChange(option)}
            >
              {swatch && (
                <span className="ops-swatch" data-color={label} aria-hidden="true" />
              )}
              {labels?.[label] ?? label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
