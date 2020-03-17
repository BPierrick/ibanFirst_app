import React from "react";
import Typography from "@material-ui/core/Typography";

interface AmountWrapperProps {
  children: number;
  currency: string;
}

const AmountWrapper: React.FC<AmountWrapperProps> = (
  props: AmountWrapperProps
) => {
  const displayedAmountValue = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: props.currency
  }).format(props.children);
  return (
    <Typography color="textPrimary" variant="subtitle1" gutterBottom>
      {displayedAmountValue}
    </Typography>
  );
};

export default AmountWrapper;
