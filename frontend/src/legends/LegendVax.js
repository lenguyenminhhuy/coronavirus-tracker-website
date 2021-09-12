class LegendVax {
    constructor(title, color, isFor, textColor) {
      this.title = title;
      this.color = color;
      this.isFor = isFor;
      this.textColor = textColor != null ? textColor : textColor;
    }
  }
  
  var legendVacs = [
    new LegendVax(
      "> 1,000,000 cases",
      "green",
      (cases) => cases >= 1_000_000,
    ),
  
    new LegendVax(
      "500,000 - 999,999 cases",
      "#629e3a",
      (cases) => cases >= 500_000 && cases < 1_000_000,
    ),
  
    new LegendVax(
      "200,000 - 499,999 cases",
      "#87bd64",
  
      (cases) => cases >= 200_000 && cases < 500_000
    ),
  
    new LegendVax(
      "0 - 199,999 cases",
      "#a3cf86",
      (cases) => cases > 0 && cases < 200_000
    ),
  
    new LegendVax("No Case", "#ebf2e6", (cases) => true),
  ];
  
  export default legendVacs;
  