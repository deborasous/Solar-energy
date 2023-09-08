import React, { useState } from 'react'; // Importe o useState do React
import Image from 'next/image';
import { BiSolidPieChartAlt2, BiSolidChart } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import Logo from '../../images/Logo.svg';
import { LinkButton } from '../button/button';
import Link from 'next/link';

interface MenuProps {
  currentPath: string;
}

export const Menu = ({ currentPath }: MenuProps) => {
  const [menuItems] = useState([
    {
      text: 'Dashboard',
      href: '/dashboard',
      icon: <BiSolidPieChartAlt2 size={32} />,
    },
    {
      text: 'Unidade consumidora',
      href: '/unidade-consumidora',
      icon: <BiSolidChart size={32} />,
    },
    {
      text: 'Cadastro de energia geradora',
      href: '/geracao-unidade',
      icon: <BsFillGearFill size={32} />,
    },
  ]);

  return (
    <>
      <nav>
        <Link href="/dashboard" className="mb-8">
          <Image
            className="m-auto"
            src={Logo}
            alt="Logo Solar Energy"
            priority={true}
          />
        </Link>
        <div>
          {menuItems.map((menuItem) => (
            <LinkButton
              key={menuItem.href}
              text={menuItem.text}
              colorClass={
                currentPath === menuItem.href ? 'bg-teal-500' : 'bg-slate-50'
              }
              href={menuItem.href}
              icon={menuItem.icon}
              isActive={currentPath === menuItem.href}
            />
          ))}
        </div>
      </nav>
    </>
  );
};
