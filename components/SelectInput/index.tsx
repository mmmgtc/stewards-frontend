import { Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import InputLayout from "../InputLayout";

interface SelectInputProps {
  defaultValue: string;
  label: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  defaultValue,
  label,
  options,
  onChange,
}) => {
  return (
    <InputLayout label={label}>
      <Select
        defaultValue={defaultValue}
        size="lg"
        variant="unstyled"
        onChange={(e) => onChange(e.target.value)}
        fontSize="1.5rem"
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

// selected={value === defaultValue ? 'selected' : ''}

export default SelectInput;
