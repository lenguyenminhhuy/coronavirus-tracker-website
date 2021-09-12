
import { Box } from "@chakra-ui/react";
import colors from "../../constants/colors";
import format from "../../utils/format";
import formatNumber from "../../utils/formatNumber";
const CustomTooltip = props => {
    const { active, payload, label, mode } = props;
    if (!active || !payload) {
      return null;
    }
    return (
      <Box 
      backgroundColor="#fff"
      borderWidth={2}
      borderRadius={5}
      borderStyle="solid"
      borderColor={colors.oceanBlueLighter}
      paddingX={6}
      paddingY={8}
      >
        <p>
          <strong>{mode === "date"? `Date: ${format.formatXAxis(label)}` : label}</strong>
        </p>
        {payload.map((item, i) => (
          <p key={i}>
            {item.name}: <strong>{formatNumber(item.value)}</strong>
          </p>
        ))}
      </Box>
    );
};

export default CustomTooltip;
