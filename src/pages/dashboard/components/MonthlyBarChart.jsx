import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
      distributed: false,
      colors: {
        // backgroundBarColors: [], // ✅ 배경 색상 제거
        backgroundBarOpacity: 0 // ✅ 흐려지는 배경 완전히 제거
        // opacity: 1 // ✅ 막대 그래프 자체의 투명도 조절
      }
      // borderRadiusApplication: 'end', // ✅ 막대의 끝부분만 둥글게 (전체 hover 배경 방지)
      // borderRadiusWhenStacked: 'last' // ✅ 여러 개의 막대가 겹칠 때, 마지막 막대만 둥글게
      // colors: {
      //   ranges: [
      //     {
      //       from: 0,
      //       to: 10000, // ✅ 최대값을 충분히 크게 설정하여 모든 막대에 적용
      //       color: undefined, // ✅ 기본 색상 유지
      //       opacity: 1 // ✅ Hover 시 색상 변경 없이 유지
      //     }
      //   ]
      // }
    }
  },
  states: {
    hover: {
      enabled: false
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    shared: false
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['남정유', '허윤경', '이진영', '홍서연', '이창수', '김채원', '도승훈'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.primary.light;

  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78, 10, 10, 10]
    }
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        ...prevState.xaxis,
        categories: ['남정유', '허윤경', '이진영', '홍서연', '이창수', '김채원', '도승훈'], // 새로운 레이블 설정
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      }
    }));
  }, [primary, info, secondary]);

  return (
    <Box id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
