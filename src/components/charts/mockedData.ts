export const lineOption = {
    // title: {
    //   text: 'Cryptocurrency Overview'
    // },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Bitcoin', 'Neo', 'Eth'],
      icon:'rect',
      bottom:0,
      orient: 'horizontal'
    },
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept','Oct']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Bitcoin',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210,234,5,43,234,23]
      },
      {
        name: 'Neo',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, ]
      },
      {
        name: 'Eth',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410,191, 234, 290, 330]
      },
    ]
  };

export const barOption = {
    tooltip: {
      // trigger: 'axis',
      // axisPointer: {
      //   type: 'shadow'
      // }
    },
    legend: {},
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
     
      {
        name: 'Bitcoin',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Neo',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };
  
  export const pieOption = {
    // title: {
    //   text: 'My Wallets',
    //   left: 'left'
    // },

    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label:{
          show: false
        },
         labelLine: {
          show: false
        },

        data: [
          { value: 8920, name: 'Wallet Balance' },
          { value: 9920, name: 'Travels' },
          { value: 4120, name: 'Foods & Drinks' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  