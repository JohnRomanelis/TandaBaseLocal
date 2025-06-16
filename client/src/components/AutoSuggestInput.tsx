import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  placeholder: string;
  apiPath: string;
  onSelect: (value: string) => void;
}

export default function AutoSuggestInput({
  label,
  placeholder,
  apiPath,
  onSelect,
}: Props) {
  /* ---------- state ---------- */
  const [query, setQuery]          = useState("");
  const [suggestions, setSug]      = useState<string[]>([]);
  const [open, setOpen]            = useState(false);
  const [skipFetch, setSkipFetch]  = useState(false);   // ★ NEW
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------- debounced fetch ---------- */
  useEffect(() => {
    if (skipFetch) return;                            // ★ block while true

    const id = setTimeout(async () => {
      const q = query.trim();
      if (q === "" || q.length < 2) {
        setSug([]);
        setOpen(false);
        return;
      }

      try {
        const r  = await fetch(`${apiPath}?query=${encodeURIComponent(q)}`);
        const js = await r.json();
        const list = js.map((d: any) => d.name ?? d.title);
        setSug(list);
        setOpen(list.length > 0);
      } catch (err) {
        console.error("suggestion error:", err);
        setSug([]);
        setOpen(false);
      }
    }, 250);

    return () => clearTimeout(id);
  }, [query, apiPath, skipFetch]);

  /* ---------- helpers ---------- */
  const close = () => {
    setOpen(false);
    setSug([]);
  };

  const handleChange = (val: string) => {
    setSkipFetch(false);                 // user typed → allow fetch again
    setQuery(val);
    onSelect(val);
    if (val.trim() === "") close();
  };

  const pick = (val: string) => {
    setQuery(val);
    onSelect(val);
    setSkipFetch(true);                 // ★ stop subsequent fetch
    close();
    inputRef.current?.blur();
  };

  /* ---------- render ---------- */
  return (
    <div className="relative">
      <label className="block text-sm mb-1">{label}</label>

      <input
        ref={inputRef}
        value={query}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length && setOpen(true)}
        onBlur={() => setTimeout(close, 120)}
        className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700"
      />

      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto rounded bg-neutral-800 border border-neutral-700 shadow">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => pick(s)}          /* onMouseDown → fires before blur */
              className="px-3 py-2 text-sm cursor-pointer hover:bg-neutral-700"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

