import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LinkProps {
  text: string;
  colorClass: string;
  href: string;
  icon?: ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export const LinkButton = ({
  text,
  colorClass,
  href,
  icon,
  isActive,
  onClick,
}: LinkProps) => {
  const buttonClasses = `${colorClass} flex items-center text-lg font-normal text-white pt-4 pb-4 ps-6 pe-6 w-60 rounded-[20px]`;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mb-4">
      <Link
        href={href}
        passHref
        onClick={handleLinkClick}
        className={`${buttonClasses} ${
          isActive ? 'bg-teal-400' : 'bg-slate-50 text-[#899097] '
        }`}
      >
        {icon && <span className="mr-4">{icon}</span>}
        {text}
      </Link>
    </div>
  );
};
