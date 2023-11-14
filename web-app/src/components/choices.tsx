import * as React from "react";
import {
  Combobox,
  makeStyles,
  Option,
  shorthands,
  useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
});

export default function Choices(props: Partial<ComboboxProps>) {
  const comboId = useId("combo-default");
  const options = ['1', '2', '3', '4'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Lựa chọn đúng</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Lựa chọn đúng"
        {...props}
      >
        {options.map((option) => (
          <Option key={option} disabled={option === ""}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};