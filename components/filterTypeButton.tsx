interface FilterTypeButtonProps {
  type: string;
  filterType: string;
  setFilterType: (type: string) => void;
}

export default function FilterTypeButton({
  type,
  filterType,
  setFilterType,
}: FilterTypeButtonProps) {
  return (
    <button
      className={`${
        filterType === type
          ? "bg-scottycon-text text-scottycon-foreground"
          : "bg-scottycon-foreground"
      } px-2 py-1 text-sm rounded-full shadow-lg`}
      onClick={() => setFilterType(type === filterType ? "" : type)}
    >
      {type}
    </button>
  );
}
