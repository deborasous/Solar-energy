import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { LineChart } from '@/components/graphic/graphic';
import { useData } from '@/context/ApiDataContext';
import { DashboardCard } from '@/components/dashboard-cards/dashboardCards';

export interface Units {
  id: string;
  apelido: string;
  local: string;
  marca: string;
  modelo: string;
  ativa: boolean;
}

export interface Releases {
  id: string;
  id_unidade: string;
  data: string;
  total: number;
}

function calcularTotais(unitData: Units[], releaseData: Releases[]) {
  const unitsTotal = unitData.length;
  const unitsActives = unitData.filter((unit) => unit.ativa).length;
  const unitsInactives = unitsTotal - unitsActives;

  const totalSumEnergy = releaseData.reduce(
    (acc, release) => acc + release.total,
    0
  );

  const averageEnergy = Math.round(totalSumEnergy / unitsTotal);

  return {
    unitsTotal,
    unitsActives,
    unitsInactives,
    averageEnergy,
  };
}

export default function Dashboard() {
  const data = useData();
  const unitData = useMemo(() => data?.unitData || [], [data]);
  const releaseData = useMemo(() => data?.releaseData || [], [data]);
  const [isActiveCard, setIsActiveCard] = useState<string>('Total Unidades');
  const { unitsTotal, unitsActives, unitsInactives, averageEnergy } =
    calcularTotais(unitData, releaseData);

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const uniqueSortedDates = useMemo(() => {
    const uniqueDates = new Set<string>();

    releaseData.forEach((release) => {
      const yearMonth = format(parseISO(release.data), 'yyyy-MM');
      uniqueDates.add(yearMonth);
    });

    return Array.from(uniqueDates).sort();
  }, [releaseData]);

  useEffect(() => {
    if (isActiveCard) {
      const selectedMonthData = prepareChartData(
        isActiveCard,
        releaseData,
        unitData,
        uniqueSortedDates,
        {
          unitsTotal,
          unitsActives,
          unitsInactives,
          averageEnergy,
        }
      );
      const correctedChartData = {
        labels: selectedMonthData.labels,
        datasets: [
          {
            label: isActiveCard,
            data: selectedMonthData.datasets[0].data.map(Number),
            borderColor: 'blue',
            backgroundColor: 'white',
            tension: 0.4,
            fill: true,
          },
        ],
      };

      setChartData(correctedChartData);
    }
  }, [
    isActiveCard,
    releaseData,
    unitData,
    uniqueSortedDates,
    averageEnergy,
    unitsActives,
    unitsInactives,
    unitsTotal,
  ]);

  const handleCardClick = (cardTitle: string) => {
    setIsActiveCard(cardTitle);
  };

  return (
    <div>
      <div className={`flex justify-center gap-5 `}>
        <DashboardCard
          title={'Total unidades'}
          total={unitsTotal}
          isActiveCard={isActiveCard === 'Total Unidades'}
          onClick={() => handleCardClick('Total Unidades')}
        />
        <DashboardCard
          title={'Unidades Ativas'}
          total={unitsActives}
          isActiveCard={isActiveCard === 'Unidades Ativas'}
          onClick={() => handleCardClick('Unidades Ativas')}
        />
        <DashboardCard
          title={'Unidades Inativas'}
          total={unitsInactives}
          isActiveCard={isActiveCard === 'Unidades Inativas'}
          onClick={() => handleCardClick('Unidades Inativas')}
        />
        <DashboardCard
          title={'Média de Energia'}
          total={averageEnergy}
          isActiveCard={isActiveCard === 'Média de Energia'}
          onClick={() => handleCardClick('Média de Energia')}
        />
      </div>
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-2 `}
      >
        <LineChart data={chartData} />
      </div>
    </div>
  );
}

function prepareChartData(
  cardTitle: string,
  releaseData: Releases[],
  unitData: Units[],
  uniqueSortedDates: string[],
  totals: {
    unitsTotal: number;
    unitsActives: number;
    unitsInactives: number;
    averageEnergy: number;
  }
) {
  const activeUnits = unitData.filter((unit) => unit.ativa);
  const inactiveUnits = unitData.filter((unit) => !unit.ativa);

  const last12Dates = uniqueSortedDates.slice(-12);

  const labels: string[] = last12Dates.map((date) =>
    format(parseISO(date), 'MMMM', { locale: pt })
  );
  const data: number[] = [];
  last12Dates.forEach((date) => {
    let totalForDate = 0;
    if (cardTitle === 'Total Unidades') {
      totalForDate = releaseData
        .filter((release) => release.data.startsWith(date))
        .reduce((acc, release) => acc + release.total, 0);
    } else if (cardTitle === 'Unidades Ativas') {
      totalForDate = releaseData
        .filter((release) => release.data.startsWith(date))
        .reduce((acc, release) => {
          const unit = activeUnits.find((u) => u.id === release.id_unidade);
          if (unit) {
            return acc + release.total;
          }
          return acc;
        }, 0);
    } else if (cardTitle === 'Unidades Inativas') {
      totalForDate = releaseData
        .filter((release) => release.data.startsWith(date))
        .reduce((acc, release) => {
          const unit = inactiveUnits.find((u) => u.id === release.id_unidade);
          if (unit) {
            return acc + release.total;
          }
          return acc;
        }, 0);
    } else if (cardTitle === 'Média de Energia') {
      const totalForDateAll = releaseData
        .filter((release) => release.data.startsWith(date))
        .reduce((acc, release) => acc + release.total, 0);

      const releasesForDate = releaseData.filter((release) =>
        release.data.startsWith(date)
      );

      const uniqueUnits = Array.from(
        new Set(releasesForDate.map((release) => release.id_unidade))
      );

      const totalUnits = uniqueUnits.length;

      if (totalUnits > 0) {
        totalForDate = Math.round(totalForDateAll / totalUnits);
      } else {
        totalForDate = 0;
      }
    }
    data.push(totalForDate);
  });

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: 'white',
        borderColor: 'blue',
        tension: 0.4,
        fill: true,
      },
    ],
  };
}
