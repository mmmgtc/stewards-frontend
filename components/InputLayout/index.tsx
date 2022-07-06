import { Box, Text } from "@chakra-ui/react";

const InputLayout: React.FC<{ label: string; children: JSX.Element }> = ({
  label,
  children,
}) => {
  return (
    <Box
      textAlign="left"
      fontSize="1.1rem"
      background="#321e5e"
      borderRadius="6px"
      p="1rem"
      w={"full"}
    >
      <Text mb="0.5rem" color="#be59cf">
        {label}
      </Text>
      {children}
    </Box>
  );
};

export default InputLayout;
