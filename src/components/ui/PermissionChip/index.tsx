interface PermissionChipProps {
  permission: string;
  isSelected: boolean;
  onToggle: (permission: string) => void;
}

const PermissionChip = ({
  permission,
  isSelected,
  onToggle,
}: PermissionChipProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(permission)}
      className={`
        px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
        border cursor-pointer select-none
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:text-white"
        }
      `}
    >
      {permission.replace(/_/g, " ")}
    </button>
  );
};

export default PermissionChip;