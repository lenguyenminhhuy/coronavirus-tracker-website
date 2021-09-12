class LegendDeath {
    constructor(title, color, isFor, textColor) {
      this.title = title;
      this.color = color;
      this.isFor = isFor;
      this.textColor = textColor != null ? textColor : textColor;
    }
  }
  
  var legendDeaths = [
    new LegendDeath(
      "> 1,000,000 cases",
      "#e33719",
      (cases) => cases >= 1_000_000,
    ),
  
    new LegendDeath(
      "500,000 - 999,999 cases",
      "#d6513a",
      (cases) => cases >= 500_000 && cases < 1_000_000,
    ),
  
    new LegendDeath(
      "200,000 - 499,999 cases",
      "#d46653",
  
      (cases) => cases >= 200_000 && cases < 500_000
    ),
  
    new LegendDeath(
      "0 - 199,999 cases",
      "#cf7869",
      (cases) => cases > 0 && cases < 200_000
    ),
  
    new LegendDeath("No Case", "#faf3f2", (cases) => true),
  ];
  
  export default legendDeaths;
  