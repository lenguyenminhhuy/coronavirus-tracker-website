const CustomTooltip = props => {
    const { active, payload, label } = props;
    if (!active || !payload) {
      return null;
    }
    return (
      <div
        className="custom-tooltip"
      >
        <p>
          <strong>{label}</strong>
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
