interface TitleProps {
  title: string;
}

export const HeaderTitle = ({ title }: TitleProps) => {
  return (
    <div className="pt-8 pb-8 pl-10 font-bold text-4xl text-[#536275] bg-white">
      {title}
    </div>
  );
};
