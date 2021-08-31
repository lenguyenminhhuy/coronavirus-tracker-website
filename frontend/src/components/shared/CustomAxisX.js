import { PureComponent } from "react";
import format from "../../utils/format";

class CustomAxisTick extends PureComponent {
    render() {
      let { x, y, stroke, payload, mode } = this.props;
      
      if (mode === 'date') {
        payload.value = format.formatXAxis(payload.value);

        return (
          <g transform={`translate(${x},${y})`}>
            <text fontSize={12} x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-10)">
              {payload.value}
            </text>
          </g>
        );
      }

      return (
        <g transform={`translate(${x},${y})`}>
          <text fontSize={12} x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-10)">
            {payload.value}
          </text>
        </g>
      )

    }
}

export default CustomAxisTick;