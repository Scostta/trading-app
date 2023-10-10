export const COLORS = {
  GREEN: `rgba(95, 185, 75)`,
  RED: `rgba(212, 69, 39)`,
  ORANGE: `rgba(255, 159, 64)`
}

export const getColorCharts = (opacity = 1) => ({
  GREEN: `rgba(95, 185, 75, ${opacity})`,
  RED: `rgba(212, 69, 39, ${opacity})`,
  ORANGE: `rgba(255, 159, 64, ${opacity})`
}) 