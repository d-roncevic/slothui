import { Search } from 'lucide-react';
import { useId } from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: Props) {
  const id = useId();

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        Search
      </label>

      <Search
        color="#475569"
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
      />

      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-full py-2 pl-10 pr-3 rounded-full w-full border border-[#CBD5E1] text-[#475569] w-full font-medium "
      />
    </div>
  );
}
