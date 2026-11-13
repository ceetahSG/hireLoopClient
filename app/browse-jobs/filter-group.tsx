import { Checkbox } from "@/components/ui/checkbox"

export type FilterOption = {
  label: string
  count?: number
}

type FilterGroupProps = {
  title: string
  options: FilterOption[]
  /** Currently selected option labels */
  selected: string[]
  onToggle?: (label: string) => void
}

/**
 * Reusable filter group: heading + checkbox list with optional counts.
 * Fully controlled — the parent owns the selection state.
 */
export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <Checkbox
              checked={selected.includes(option.label)}
              onCheckedChange={() => onToggle?.(option.label)}
            />
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span className="ml-auto text-xs text-muted-foreground">
                {option.count}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
