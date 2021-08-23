class LegendItem {
  constructor(title, color, isFor, textColor) {
    this.title = title;
    this.color = color;
    this.isFor = isFor;
    this.textColor = textColor != null ? textColor : textColor;
  }
}

var legendItems = [
  new LegendItem(
    "> 1,000,000 cases",
    "#2373eb",
    (cases) => cases >= 1_000_000,
  ),

  new LegendItem(
    "500,000 - 999,999 cases",
    "#4482e3",
    (cases) => cases >= 500_000 && cases < 1_000_000,
  ),

  new LegendItem(
    "200,000 - 499,999 cases",
    "#6294e3",

    (cases) => cases >= 200_000 && cases < 500_000
  ),

  new LegendItem(
    "0 - 199,999 cases",
    "#aac6f0",
    (cases) => cases > 0 && cases < 200_000
  ),

  new LegendItem("No Case", "#d4e2fb", (cases) => true),
];

export default legendItems;
