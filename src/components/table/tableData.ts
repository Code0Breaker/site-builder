interface Itable{
    date:string
    type:string
    amount:string
    remaining:string
    price:string
    usd:string
    fee:string
    status:string
    statusColor:"inherit" | "success" | "error" | "primary" | "secondary" | "info" | "warning"

}

export const tableData:Itable[] = [
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'success'},
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'success'},
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'success'},
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'error'},
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'success'},
    {date:'28-July-2018 06:51:51', type:'Buy', amount:'0.58647', remaining:'0.58647', price:'11900.12',usd:'$ 1597.78',fee:'0.023',status:'accept',statusColor:'success'},
]