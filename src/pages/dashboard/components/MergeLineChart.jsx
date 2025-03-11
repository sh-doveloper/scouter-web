import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { fetchMergeChartData } from '../api/DashBoardData';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

// 기본 차트 옵션
const areaChartOptions = {
  chart: {
    height: 140,
    type: 'line',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 1.5 },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'category',
    categories: [],
    labels: {
      formatter: (value) => `${value}` // X축 값
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    show: true,
    labels: {
      style: { colors: '#666' }
    }
  },
  tooltip: {
    x: {
      formatter: (_, { dataPointIndex, w }) => {
        return w.globals.initialSeries[0].data[dataPointIndex].label; // 툴팁에 원래 날짜 표시 (YYYY-MM-DD)
      }
    }
  }
};

// ==============================|| REPORT AREA CHART ||============================== //

export default function MergeLineChart({ setMergeGrowthRate = () => {} }) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 서버에서 데이터를 가져오는 함수
  const loadChartData = async () => {
    setLoading(true);
    try {
      const { dailyMergeCount, dailyMergeCounts } = await fetchMergeChartData();

      // X축 날짜를 'MM.DD' 형식으로 변환
      const categories = dailyMergeCounts.map((item) => item.mergeDate);

      // 데이터 변환
      const seriesData = dailyMergeCounts.map((item, index) => ({
        x: categories[index],
        y: item.mergeCount,
        label: item.mergeDate // 툴팁에서 표시할 원래 날짜
      }));

      // 증가율 계산
      const firstValue = seriesData[0].y; // 첫 번째 값 (30일 전)
      const lastValue = seriesData[seriesData.length - 1].y; // 최신 값 (오늘)
      let growthRate = 0;
      if (firstValue > 0) {
        growthRate = ((lastValue - firstValue) / firstValue) * 100;
      }
      setMergeGrowthRate(growthRate.toFixed(2)); // 소수점 2자리 반올림

      // y축 최적화 설정하기
      const maxValue = Math.max(...seriesData.map((d) => d.y));
      const minValue = Math.min(...seriesData.map((d) => d.y));
      const yMax = Math.ceil(maxValue / 100) * 100; // 100 단위 반올림
      const yMin = Math.floor(minValue / 100) * 100; // 최소값 100 단위로 내림
      const range = yMax - yMin;
      let tickAmount = Math.ceil(range / 100); // 100 단위당 눈금 개수 설정
      if (tickAmount > 2) tickAmount = 2; // 최대 10개 눈금
      if (tickAmount < 2) tickAmount = 2; // 최소 2개 눈금
      const tickInterval = Math.ceil(range / tickAmount / 10) * 10; // 눈금 간격 조정
      const tickValues = Array.from({ length: tickAmount + 1 }, (_, i) => yMin + i * tickInterval);

      setOptions((prevState) => ({
        ...prevState,
        colors: [theme.palette.warning.main],
        chart: {
          ...prevState.chart,
          dropShadow: {
            enabled: true, // 그림자 효과 활성화
            top: 5, // Y축 위치 조정
            left: 0, // X축 위치 조정
            blur: 3, // 흐림 정도
            opacity: 0.5, // 투명도
            color: theme.palette.warning.light // 차트 색상과 비슷한 그림자 색상 적용
          }
        },
        xaxis: {
          ...prevState.xaxis,
          categories,
          labels: {
            show: false,
            style: {
              colors: categories.map(() => secondary) // X축 색상 설정
            }
          }
        },
        yaxis: {
          show: true,
          max: yMax,
          min: yMin,
          tickAmount: tickValues.length - 1,
          labels: {
            formatter: (value) => (tickValues.includes(value) ? `${value}` : ''),
            style: { colors: secondary }
          }
        },
        grid: { borderColor: line },
        legend: {
          labels: { colors: 'grey.500' }
        },
        tooltip: {
          enabled: true, // 🔹 툴팁 활성화
          shared: true, // 🔹 여러 데이터가 있는 경우, X축에서 하나의 툴팁만 표시
          intersect: false, // 🔹 마우스를 데이터 포인트에 올려도 툴팁이 중복되지 않도록 설정
          followCursor: true, // 🔹 마우스 커서를 따라 툴팁 이동
          x: {
            show: false // 🔹 X축 툴팁(날짜)만 숨김
          },
          // marker: {
          //   show: false // 🔹 데이터 포인트의 마커 툴팁 숨김 (이게 두 개 나오는 원인)
          // },
          // x: {
          //   formatter: (_, { dataPointIndex, w }) => {
          //     const date = w.globals.initialSeries[0].data[dataPointIndex].label;
          //     return date; // 툴팁에 원래 날짜(YYYY-MM-DD) 표시
          //   }
          // },
          y: {
            formatter: (value) => `${value}건` // Merge Count 값 표시
          },
          marker: {
            show: true // 🔹 데이터 포인트에서만 툴팁 표시
          }
        }
      }));
      setSeries([{ name: 'Merge Count', data: seriesData }]);
    } catch (error) {
      console.error('차트 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChartData().catch((error) => {
      console.log('차트 데이터를 불러오는 중 오류 발생:', error);
    });
  }, [primary, secondary, line, theme]);

  return (
    <>
      <Box sx={{ pt: 1, pr: 2 }}>
        {loading ? <p>Loading...</p> : <ReactApexChart options={options} series={series} type="line" height={150} />}
      </Box>
    </>
  );
}

MergeLineChart.propTypes = {
  setMergeGrowthRate: PropTypes.func // `setMergeGrowthRate`는 함수 타입이어야 함
};
