import React, { useState } from "react";
import classes from "./BieuDo.module.css";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    CartesianGrid,
    CartesianAxisProps,
    ResponsiveContainer
} from "recharts";

interface Props {
    className?: string;
}

const BieuDo: React.FC<Props> = () => {
    const [chartType, setChartType] = useState<'ngày' | 'tuần' | 'tháng'>('ngày');

    const data = {
        "ngày": [
            { name: '1', sl: 4221 },
            { name: '2', sl: 2300 },
            { name: '3', sl: 2600 },
            { name: '4', sl: 3300 },
            { name: '5', sl: 3000 },
            { name: '6', sl: 2000 },
            { name: '7', sl: 3000 },
            { name: '8', sl: 3000 },
            { name: '9', sl: 2000 },
            { name: '10', sl: 2000 },
            { name: '11', sl: 2000 },
            { name: '12', sl: 2000 },
            { name: '13', sl: 3000 },
            { name: '14', sl: 3000 },
            { name: '15', sl: 2000 },
            { name: '16', sl: 4221 },
            { name: '17', sl: 3000 },
            { name: '18', sl: 2000 },
            { name: '19', sl: 3300 },
            { name: '20', sl: 3000 },
            { name: '21', sl: 2000 },
            { name: '22', sl: 4000 },
            { name: '23', sl: 3000 },
            { name: '24', sl: 2000 },
            { name: '25', sl: 3000 },
            { name: '26', sl: 3000 },
            { name: '27', sl: 2000 },
            { name: '28', sl: 3000 },
            { name: '29', sl: 3000 },
            { name: '30', sl: 3000 },
            { name: '31', sl: 2000 },


        ],
        "tuần": [
            { name: 'Tuần 1', sl: 4000 },
            { name: 'Tuần 2', sl: 2000 },
            { name: 'Tuần 3', sl: 3000 },
            { name: 'Tuần 4', sl: 6000 }
        ],
        "tháng": [
            { name: '1', sl: 4000 },
            { name: '2', sl: 4000 },
            { name: '3', sl: 4000 },
            { name: '4', sl: 4000 },
            { name: '5', sl: 2000 },
            { name: '6', sl: 4000 },
            { name: '7', sl: 4000 },
            { name: '8', sl: 6000 },
            { name: '9', sl: 4000 },
            { name: '10', sl: 4000 },
            { name: '11', sl: 4000 },
            { name: '12', sl: 4000 }
        ]
    }


    const chartData = chartType === 'ngày' ? data[chartType].slice(0, 31) : data[chartType];


    return (
        <div className={classes.container}>
            <a className={classes.a}>Bảng thống kê theo {chartType} </a>
            <div className={classes.frameXem}>
                <a className={classes.a2} >Xem theo</a>
                <select className={classes.selectBox} value={chartType} onChange={(e) => setChartType(e.target.value as 'ngày' | 'tuần' | 'tháng')}>
                    <option value="ngày">Ngày</option>
                    <option value="tuần">Tuần</option>
                    <option value="tháng">Tháng</option>
                </select>
            </div>
            <ResponsiveContainer className={classes.chart} height={300}>

                {chartType === 'ngày' ? (
                    <AreaChart data={chartData} >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" ticks={chartData.filter(item => ['1', '13', '19', '31'].includes(item.name)).map(item => item.name)} />
                        <YAxis
                            domain={[0, 6000]}
                            tickCount={7}
                        />
                        <Area
                            type="monotone"
                            dataKey="sl"
                            stroke="#5185F7"
                            strokeWidth={2}
                            fill="url(#colorGradient)"
                            fillOpacity={0.8}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#5185F7" stopOpacity={1} />
                                <stop offset="100%" stopColor="#5185F7" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Tooltip itemStyle={{ color: 'white' }} labelStyle={{ display: 'none' }} contentStyle={{ backgroundColor: '#5185F7' }} />
                    </AreaChart>

                ) : (
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 6000]} tickCount={7} />
                        <Area
                            type="monotone"
                            dataKey="sl"
                            stroke="#5185F7"
                            strokeWidth={2}
                            fill="url(#colorGradient)"
                            fillOpacity={0.8}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#5185F7" stopOpacity={1} />
                                <stop offset="100%" stopColor="#5185F7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip itemStyle={{ color: 'white' }} labelStyle={{ display: 'none' }} contentStyle={{ backgroundColor: '#5185F7' }} />
                    </AreaChart>
                )}
            </ResponsiveContainer>
            <a className={classes.a3}>sl/{chartType}</a>
        </div>
    );
}

export default BieuDo;
