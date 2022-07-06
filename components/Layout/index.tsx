import { VStack } from "@chakra-ui/react";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return <VStack w='90vw' m={'auto'} py='4rem'>{children}</VStack>
}

export default Layout;