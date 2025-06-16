import { useState } from "react";
import AutoSuggestInput from "./AutoSuggestInput";

/* ------------ types ------------ */
interface SearchParams {
  title?: string;
  orchestra?: string;
  singer?: string;
  yearFrom?: number;
  yearTo?: number;
  type?: string;
  style?: string;
  isInstrumental?: boolean;
  alsoPlayedBy?: string;
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

/* ------------ component ------------ */
export default function SongSearchForm({ onSearch }: Props) {
  const [showAdv, setShowAdv] = useState(false);
  const [form, setForm] = useState<SearchParams>({});

  /* -- helper updates: remove key when empty -------------------- */
  const update = (key: keyof SearchParams, value: any) => {
    setForm((prev) => {
      const fresh = { ...prev };

      const empty =
        value === "" ||
        value === null ||
        (typeof value === "number" && isNaN(value));

      if (empty) {
        delete fresh[key];
      } else {
        fresh[key] = value;
      }
      return fresh;
    });
  };

  /* -- submit ---------------------------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 search params", form);
    onSearch(form);
  };

  /* ------------ UI ------------ */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-6 rounded-lg text-white space-y-4"
    >
      {/* basic auto‑suggest fields */}
      <div className="grid md:grid-cols-3 gap-4">
        <AutoSuggestInput
          label="Title"
          placeholder="Search by title..."
          apiPath="/api/suggestions/titles"
          onSelect={(v) => update("title", v)}
        />
        <AutoSuggestInput
          label="Orchestra"
          placeholder="Search orchestra..."
          apiPath="/api/suggestions/orchestras"
          onSelect={(v) => update("orchestra", v)}
        />
        <AutoSuggestInput
          label="Singer"
          placeholder="Search singer..."
          apiPath="/api/suggestions/singers"
          onSelect={(v) => update("singer", v)}
        />
      </div>

      {/* numeric / dropdown filters */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* year range */}
        <div>
          <label className="block text-sm mb-1">Year range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="From"
              className="w-full px-2 py-2 rounded bg-neutral-900 border border-neutral-700"
              onChange={(e) => update("yearFrom", parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="To"
              className="w-full px-2 py-2 rounded bg-neutral-900 border border-neutral-700"
              onChange={(e) => update("yearTo", parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* type */}
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700"
            onChange={(e) => update("type", e.target.value)}
            defaultValue=""
          >
            <option value="">All types</option>
            <option value="Tango">Tango</option>
            <option value="Milonga">Milonga</option>
            <option value="Vals">Vals</option>
          </select>
        </div>

        {/* style */}
        <div>
          <label className="block text-sm mb-1">Style</label>
          <select
            className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700"
            onChange={(e) => update("style", e.target.value)}
            defaultValue=""
          >
            <option value="">All styles</option>
            <option value="Rhythmic">Rhythmic</option>
            <option value="Melodic">Melodic</option>
            <option value="Dramatic">Dramatic</option>
          </select>
        </div>

        {/* instrumental toggle */}
        <div className="flex items-center space-x-2 mt-6">
          <input
            type="checkbox"
            onChange={(e) => update("isInstrumental", e.target.checked)}
          />
          <label className="text-sm">Instrumental only</label>
        </div>
      </div>

      {/* advanced toggle + field */}
      <button
        type="button"
        onClick={() => setShowAdv(!showAdv)}
        className="text-sm underline text-gray-400"
      >
        {showAdv ? "Hide" : "Show"} advanced search
      </button>

      {showAdv && (
        <div className="bg-neutral-900 p-4 rounded">
          <AutoSuggestInput
            label="Also played by orchestra"
            placeholder="Orchestra name..."
            apiPath="/api/suggestions/orchestras"
            onSelect={(v) => update("alsoPlayedBy", v)}
          />
        </div>
      )}

      {/* actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setForm({})}
          className="text-sm underline text-gray-400"
        >
          Clear all
        </button>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Search songs
        </button>
      </div>
    </form>
  );
}
