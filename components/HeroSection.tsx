import { motion } from "framer-motion";
import { PersonalInfo } from "../types/resume";
import { useState, useEffect, useRef } from "react";
import { Box, Container, VStack, Heading, Text, HStack, Icon } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import GLOBE from "vanta/dist/vanta.globe.min";
interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const texts = ["Full Stack Developer", "React Specialist", "Node.js Expert", "Cloud Engineer"];

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex];

        if (!isDeleting) {
          setCurrentText(current.substring(0, currentText.length + 1));

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(current.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  // Vanta.js effect
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined" && vantaRef.current && !vantaEffect.current) {
      const initVanta = async () => {
        const THREE = await import("three");

        if (vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = GLOBE({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x1c191e,
            color1: 0xff3f81,
            shotDots: true,
            wingSpan: 15.0,
            speedLimit: 1,
            separation: 20.0,
            alignment: 20.0,
            cohesion: 20.0,
            quantity: 3.0,
            points: 7
          });
        }
      };

      initVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <Box
      ref={vantaRef}
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex="10">
        <VStack spacing={8} textAlign="center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="bold"
              letterSpacing="wider"
              color="white"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            >
              {personalInfo.name}
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HStack spacing={2} justify="center" h="12">
              <Text
                fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
                color="white"
                fontWeight="light"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
              >
                I am a
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
                color="#ff004d"
                fontWeight="semibold"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
              >
                {currentText}
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
                color="#ff004d"
                className="animate-pulse"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
              >
                |
              </Text>
            </HStack>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              color="gray.100"
              maxW="3xl"
              lineHeight="relaxed"
              textShadow="1px 1px 2px rgba(0,0,0,0.5)"
            >
              {personalInfo.summary}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          ></motion.div>{" "}
        </VStack>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10
        }}
      >
        <Box className="animate-bounce">
          <Icon as={FaChevronDown} boxSize={6} color="white" />
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
