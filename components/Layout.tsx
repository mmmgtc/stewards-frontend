import { VStack } from "@chakra-ui/react";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return <><VStack>{children}</VStack></>
}

export default Layout;