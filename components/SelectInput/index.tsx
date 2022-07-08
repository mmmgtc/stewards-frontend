import { Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import InputLayout from "../InputLayout";

interface SelectInputProps {
  label: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  onChange,
}) => {
  return (
    <InputLayout label={label}>
      <Select
        size="lg"
        variant="unstyled"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </InputLayout>
  );
};

export default SelectInput;
