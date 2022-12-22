import ReactECharts from 'echarts-for-react';

export const DinamicChart = ({option}:{option:any}) =>{
    return <ReactECharts style={{width:'100%', height:'100%'}} option={option} />
}