import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    ResponsiveContainer,
    YAxis,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { useTheme } from '@material-ui/core';

interface BarChartProps {}
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const data = [
    { name: 'Positive', value: 20 },
    { name: 'Negative', value: 10 },
];
export const PieEmotionChart: React.SFC<BarChartProps> = props => {
    const theme = useTheme();
    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey='value'
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                entry.name === 'Positive'
                                    ? theme.palette.success.main
                                    : theme.palette.error.main
                            }
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};
