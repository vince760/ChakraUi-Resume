import React, { ReactNode, useState } from "react";
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
  BoxProps,
  FlexProps,
  Link,
  Image,
  Tooltip
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
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

const EXPANDED_W = "72";  // 18rem / 288px
const COLLAPSED_W = "20"; // 5rem / 80px

export default function SideNav({
  children,
  personalInfo
}: {
  children?: ReactNode;
  personalInfo: PersonalInfo;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box minH="100vh" backgroundColor="#212428">
      {/* Desktop sidebar */}
      <SidebarContent
        onClose={onClose}
        personalInfo={personalInfo}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((c) => !c)}
        display={{ base: "none", md: "block" }}
      />

      {/* Mobile drawer */}
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

      {/* Mobile top bar */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      {/* Main content — shifts with sidebar */}
      <Box
        ml={{ base: 0, md: isCollapsed ? COLLAPSED_W : EXPANDED_W }}
        transition="margin-left 0.3s ease"
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  personalInfo: PersonalInfo;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const SidebarContent = ({
  onClose,
  personalInfo,
  isCollapsed = false,
  onToggle,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      bg="#212428"
      borderRight="1px solid rgba(255,255,255,0.06)"
      pos="fixed"
      h="full"
      w={isCollapsed ? COLLAPSED_W : EXPANDED_W}
      transition="width 0.3s ease"
      overflow="hidden"
      zIndex={100}
      {...rest}
    >
      {/* Floating toggle button — sticks out from right edge */}
      {onToggle && (
        <Box
          position="absolute"
          right="-11px"
          top="50%"
          transform="translateY(-50%)"
          w="22px"
          h="22px"
          bgGradient="linear(to-br, blue.500, purple.600)"
          borderRadius="full"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={onToggle}
          zIndex={999}
          boxShadow="0 0 14px rgba(66,153,225,0.55)"
          _hover={{ transform: "translateY(-50%) scale(1.2)" }}
          transition="transform 0.2s"
        >
          <Icon
            as={isCollapsed ? FiChevronRight : FiChevronLeft}
            color="white"
            w="10px"
            h="10px"
          />
        </Box>
      )}

      {/* Profile image */}
      <Flex
        pt={8}
        pb={6}
        alignItems="center"
        justifyContent="center"
        position="relative"
        px={4}
      >
        <Image
          src={profileImage.src}
          boxSize={isCollapsed ? "42px" : "130px"}
          borderRadius="full"
          objectFit="cover"
          alt="Vincent Vitale"
          border="2px solid rgba(66,153,225,0.3)"
          transition="all 0.3s ease"
          flexShrink={0}
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color="white"
          position="absolute"
          right={3}
          top={3}
        />
      </Flex>

      {/* Nav links */}
      <Box py={2}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            href={link.href}
            isCollapsed={isCollapsed}
            onClick={onClose}
            color="#e4e6ea"
            fontFamily='"Montserrat",sans-serif'
            opacity={0.85}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>

      {/* Social links — pinned to bottom */}
      <Box position="absolute" bottom={6} w="full" px={2}>
        <Flex
          justify="center"
          align="center"
          direction={isCollapsed ? "column" : "row"}
          gap={isCollapsed ? 4 : 6}
        >
          <Tooltip
            label="LinkedIn"
            placement="right"
            isDisabled={!isCollapsed}
            hasArrow
            bg="#2a2a2a"
            color="white"
          >
            <Link
              href={personalInfo.linkedin}
              isExternal
              color="gray.400"
              _hover={{ color: "#ff004d", transform: "scale(1.15)" }}
              transition="all 0.3s ease"
              display="flex"
            >
              <Icon as={FaLinkedin} boxSize={6} />
            </Link>
          </Tooltip>

          <Tooltip
            label="GitHub"
            placement="right"
            isDisabled={!isCollapsed}
            hasArrow
            bg="#2a2a2a"
            color="white"
          >
            <Link
              href={personalInfo.github}
              isExternal
              color="gray.400"
              _hover={{ color: "#ff004d", transform: "scale(1.15)" }}
              transition="all 0.3s ease"
              display="flex"
            >
              <Icon as={FaGithub} boxSize={6} />
            </Link>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const NavItem = ({
  icon,
  children,
  href = "#",
  onClick,
  isCollapsed = false,
  ...rest
}: NavItemProps) => {
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

  const item = (
    <Box
      as="a"
      href={href}
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        justify={isCollapsed ? "center" : "flex-start"}
        p="3"
        mx="2"
        mb="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="all 0.25s ease"
        _hover={{
          color: "#ff004d",
          bg: "rgba(255,0,77,0.08)",
          boxShadow: "0 0 12px rgba(255,0,77,0.2)"
        }}
        {...rest}
      >
        <Icon
          as={icon}
          fontSize="18"
          mr={isCollapsed ? 0 : 3}
          flexShrink={0}
          _groupHover={{ color: "#ff004d" }}
          transition="all 0.25s ease"
        />
        {!isCollapsed && (
          <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
            {children}
          </Text>
        )}
      </Flex>
    </Box>
  );

  if (isCollapsed) {
    return (
      <Tooltip
        label={children}
        placement="right"
        hasArrow
        bg="#2a2a2a"
        color="white"
        fontSize="sm"
      >
        {item}
      </Tooltip>
    );
  }

  return item;
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg="#212428"
      borderBottomWidth="1px"
      borderBottomColor="rgba(255,255,255,0.06)"
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        color="white"
        borderColor="rgba(255,255,255,0.2)"
        _hover={{ borderColor: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.05)" }}
      />
      <Text fontSize="xl" fontFamily="monospace" fontWeight="bold" color="white">
        Vincent Vitale
      </Text>
    </Flex>
  );
};
