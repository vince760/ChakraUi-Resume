import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  BoxProps,
  FlexProps,
  VStack,
  Button,
  HStack,
  Link,
  Image
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IconType } from "react-icons";
import profileImage from "../images/profile.jpg";
import { PersonalInfo } from "../types/resume";
interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "#home" },
  { name: "About", icon: FiTrendingUp, href: "#about" },
  { name: "Portfolio", icon: FiCompass, href: "#portfolio" },
  { name: "Resume", icon: FiStar, href: "#resume" },
  { name: "Contact", icon: FiSettings, href: "#contact" }
];

export default function SideNav({
  children,
  personalInfo
}: {
  children?: ReactNode;
  personalInfo: PersonalInfo;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" backgroundColor={"#212428"}>
      <SidebarContent onClose={() => onClose} personalInfo={personalInfo} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} personalInfo={personalInfo} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 72 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  personalInfo: PersonalInfo;
}

const SidebarContent = ({ onClose, personalInfo, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("#212428", "#212428")}
      borderRight=".5px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      pos="fixed"
      h="full"
      {...rest}
      p={4}
    >
      <Flex pt={10} pb={10} alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={profileImage.src}
          boxSize="150px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          color={"#e4e6ea"}
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClick={onClose}
          fontFamily={'"Montserrat",sans-serif'}
          fontSize={"larger"}
          opacity={0.8}
        >
          {link.name}
        </NavItem>
      ))}
      <VStack pt={4} spacing={6} align="center" w="full">
        <HStack spacing={6} justify="center">
          <Link
            href={personalInfo.linkedin}
            isExternal
            color="gray.200"
            _hover={{
              color: "#ff004d",
              boxShadow: "0 0 8px rgba(255, 0, 77, 0.4)",
              transform: "scale(1.1)"
            }}
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 0 8px rgba(255, 0, 77, 0.4)",
                transform: "scale(1.1)",
                color: "#ff004d"
              }
            }}
            transition="all 0.3s ease-in-out"
          >
            <Icon
              as={FaLinkedin}
              boxSize={8}
              sx={{
                transition: "all 0.3s ease-in-out"
              }}
            />
          </Link>

          <Link
            href={personalInfo.github}
            isExternal
            color="gray.200"
            _hover={{
              color: "#ff004d",
              boxShadow: "0 0 8px rgba(255, 0, 77, 0.4)",
              transform: "scale(1.1)"
            }}
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 0 8px rgba(255, 0, 77, 0.4)",
                transform: "scale(1.1)",
                color: "#ff004d"
              }
            }}
            transition="all 0.3s ease-in-out"
          >
            <Icon
              as={FaGithub}
              boxSize={8}
              sx={{
                transition: "all 0.3s ease-in-out"
              }}
            />
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, children, href = "#", onClick, ...rest }: NavItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClick?.();
  };

  return (
    <Box
      as="a"
      href={href}
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: "#ff004d",
          boxShadow: "0 0 10px rgba(255, 0, 77, 0.5)",
          transform: "scale(1.01)",
          transition: "all 0.3s ease-in-out"
        }}
        sx={{
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 10px rgba(255, 0, 77, 0.5)",
            transform: "scale(1.01)",
            color: "#ff004d"
          }
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "#ff004d"
            }}
            sx={{
              transition: "all 0.3s ease-in-out"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 72 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="brand.600"
      >
        Vincent Vitale
      </Text>
    </Flex>
  );
};
