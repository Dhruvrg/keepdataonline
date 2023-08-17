"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-1 active:scale-105 active:text-pink-500 focus:scale-105 focus:text-pink-500 hover:scale-105 hover:text-pink-500 text-lg font-bold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
