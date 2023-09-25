interface CardProps {
  title: string;
  total: number;
  isActiveCard: boolean;
  onClick?: () => void;
}

export const DashboardCard = ({
  title,
  total,
  isActiveCard,
  onClick,
}: CardProps) => {

  return (
    <div
      className={`pt-6 pb-6 pl-8 pr-8 max-w-[258px] text-center cursor-pointer rounded-lg ${
        isActiveCard
          ? 'text-indigo-600 border border-indigo-600'
          : 'text-[#536275] border borde-[#9FA2B4]'
      }`}
      onClick={onClick}
    >
      <h4
        className={`font-bold text-lg ${
          isActiveCard ? 'text-indigo-600' : 'text-[#9FA2B4] '
        }`}
      >
        {title}
      </h4>
      <p
        className={`font-bold text-4xl ${
          isActiveCard ? 'text-indigo-600 ' : 'text-[#536275] '
        }`}
      >
        {total}
      </p>
    </div>
  );
};
