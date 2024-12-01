import { Tooltip } from "@mui/material";
import Image from "next/image";
import ToolTipIcon from "@/assets/toolTipIcon.svg";

const ToolTipComponent = ({ title }) => {
  return (
    <Tooltip title={title} arrow placement="top">
      <Image src={ToolTipIcon} alt="toolTip" />
    </Tooltip>
  );
};

export default ToolTipComponent;
