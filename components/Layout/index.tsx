import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Router>
      <VStack w="95vw" m={"auto"} py="4rem">
        {children}
      </VStack>
    </Router>
  );
};

export default Layout;
