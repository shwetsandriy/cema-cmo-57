import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function FilterDisplay({ selectedFilters, removeFilter, clearAll }) {
  return (
    <div className="flex gap-2 items-center" style={{marginBottom: '15px'}}>
      {selectedFilters.length > 0 && (
        <Button variant="outline" onClick={clearAll}>
          Clear all <X size={14} />
        </Button>
      )}
      {selectedFilters.map((filter) => (
        <Button
          key={filter}
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => removeFilter(filter)}
        >
          {filter} <X size={14} />
        </Button>
      ))}
    </div>
  );
}