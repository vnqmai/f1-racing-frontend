import F1BarChart from '@/components/F1BarChart/F1BarChart';
import F1PieChart from '@/components/F1PieChart/F1PieChart';
import { ResultItem } from '@/types';
import React, { useEffect, useState } from 'react';

export interface IF1RacingResultsTeamChartProps {
  year: string | number,
  team: string,
}

export default function F1RacingResultsTeamChart (props: IF1RacingResultsTeamChartProps) {
  const {
    year,
    team,
  } = props;

  const [items, setItems] = useState<ResultItem[]>([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (items) {
      const byYear = groupBy(items.filter(it => it.year == year), it => it.car);
      if (byYear && byYear[team]) {
        const rankings = rankingUniqs(byYear[team]);
        setChartData(rankings);
      }
    }
  }, [year, team, items]);
  
  const groupBy = (a: any[], keyFunction: (el: any) => any) => {
    const groups: any = {};
    a.forEach(function(el) {
      const key = keyFunction(el);
      if (key in groups === false) {
        groups[key] = [];
      }
      groups[key].push(el);
    });
    return groups;
  }

  const rankingUniqs = (group: any) => {
    const uniqs = group.reduce((acc: any, val: ResultItem) => {
      acc[val.no] = acc[val.no] === undefined ? 1 : acc[val.no] += 1;
      return acc;
    }, {});
    return uniqs;
  }

  const fetchData = async (
    year: number | string | undefined | null = undefined,
    team: string | undefined | null = undefined,
  ) => {
    const stringUrl = `${process.env.BASE_API_URL}/data`;
    const url = new URL(stringUrl);
    const params = url.searchParams;
    year && params.append("year", year.toString());
    team && params.append("car", team);

    const response = await fetch(url.toString());
    const data: ResultItem[] = await response.json();
    setItems(data);
  };

  return (
    (chartData && Object.keys(chartData).length > 0) ?
    <div>
      <F1BarChart
        title={`Xếp hạng của team ${team} trong năm năm ${year}`}
        labels={Object.keys(chartData)}
        dataNumbers={Object.values(chartData)}
      />
    </div> :
    ''
  );
}
