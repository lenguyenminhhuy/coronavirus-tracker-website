
import format from "../../utils/format";
const CustomTooltip = props => {
    const { active, payload, label, mode } = props;
    if (!active || !payload) {
      return null;
    }
    return (
      <div
        className="custom-tooltip"
      >
        <p>
          <strong>{mode === "date"? format.formatXAxis(label) : label}</strong>
        </p>
        {payload.map((item, i) => (
          <p key={i}>
            {item.name}: <strong>{item.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
};

export default CustomTooltip;
