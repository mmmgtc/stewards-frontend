import { Stack, Text } from "@chakra-ui/react";

const InputLayout: React.FC<{ label: string; children: JSX.Element }> = ({
  label,
  children,
}) => {
  return (
    <Stack
      textAlign="left"
      fontSize="1.1rem"
      background="#321e5e"
      borderRadius="6px"
      p="1rem"
      w={"full"}
      height='7rem'
      justifyItems='center'
    >
      <Text mb="0.5rem" color="#be59cf">
        {label}
      </Text>
      {children}
    </Stack>
  );
};

export default InputLayout;
