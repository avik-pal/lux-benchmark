import {
  Chart,
  BarController,
  LineController,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Colors,
  LogarithmicScale,
  Title,
} from "chart.js";

import type { FontSpec } from "chart.js";

export const configureChartJS = () => {
  Chart.register(
    BarController,
    LineController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    BarElement,
    LineElement,
    PointElement
  );
  Chart.register(Colors, Legend, Title, Tooltip);

  Chart.defaults.aspectRatio = 1.2;
  Chart.defaults.plugins.title.display = true;
  (Chart.defaults.plugins.title.font as FontSpec).size = 16;
};
