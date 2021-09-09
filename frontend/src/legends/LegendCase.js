class LegendCase {
  constructor(title, color, isFor, textColor) {
    this.title = title;
    this.color = color;
    this.isFor = isFor;
    this.textColor = textColor != null ? textColor : textColor;
  }
}

var legendCases = [
  new LegendCase(
    "> 1,000,000 cases",
    "#c2a72f",
    (cases) => cases >= 1_000_000,
  ),

  new LegendCase(
    "500,000 - 999,999 cases",
    "#ebcd49",
    (cases) => cases >= 500_000 && cases < 1_000_000,
  ),

  new LegendCase(
    "200,000 - 499,999 cases",
    "#edd35f",

    (cases) => cases >= 200_000 && cases < 500_000
  ),

  new LegendCase(
    "0 - 199,999 cases",
    "#f5de7a",
    (cases) => cases > 0 && cases < 200_000
  ),

  new LegendCase("No Case", "#f2e6ae", (cases) => true),
];

export default legendCases;
