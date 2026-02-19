import { motion } from "framer-motion";
import { useState } from "react";
import { Experience, Education, Skill } from "../types/resume";
import {
  Box,
  Container,
  Heading,
  Button,
  ButtonGroup,
  VStack,
  HStack,
  Text,
  Progress,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";

interface ResumeSectionProps {
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

type TabType = "experience" | "education" | "skills";

const ResumeSection: React.FC<ResumeSectionProps> = ({ experiences, education, skills }) => {
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  const tabs = [
    { id: "experience" as TabType, label: "Experience" },
    { id: "education" as TabType, label: "Education" },
    { id: "skills" as TabType, label: "Professional Skills" }
  ];

  const bgColor = useColorModeValue("#1d191f", "#1d191f");

  const ExperienceCard = ({ exp }: { exp: Experience }) => (
    <Box
      bg="rgba(255,255,255,0.04)"
      border="1px solid rgba(255,255,255,0.08)"
      borderRadius="xl"
      p={6}
      backdropFilter="blur(4px)"
      transition="all 0.3s"
      _hover={{
        bg: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(99,179,237,0.3)"
      }}
    >
      <Text fontSize="xs" color="blue.300" fontWeight="semibold" letterSpacing="wider" mb={1}>
        {exp.startDate} — {exp.endDate || "Present"}
      </Text>
      <Heading fontSize="lg" fontWeight="bold" color="white" mb={1}>
        {exp.position}
      </Heading>
      <Text fontSize="sm" color="purple.300" fontWeight="semibold" mb={4}>
        {exp.company}
      </Text>
      <VStack spacing={2} align="stretch" mb={4}>
        {exp.description.slice(1).map((desc, i) => (
          <HStack key={i} align="flex-start" spacing={3}>
            <Box w="4px" h="4px" borderRadius="full" bg="blue.400" mt="8px" flexShrink={0} />
            <Text fontSize="sm" color="gray.400" lineHeight="1.7">
              {desc}
            </Text>
          </HStack>
        ))}
      </VStack>
      <HStack flexWrap="wrap" spacing={2}>
        {exp.technologies.map((tech, i) => (
          <Text
            key={i}
            px={3}
            py={1}
            bg="rgba(66,153,225,0.12)"
            color="blue.300"
            fontSize="xs"
            fontWeight="medium"
            borderRadius="full"
            border="1px solid rgba(66,153,225,0.25)"
          >
            {tech}
          </Text>
        ))}
      </HStack>
    </Box>
  );

  return (
    <Box as="section" id="resume" py={20} bg={bgColor}>
      <Container maxW="container.xl" px={6}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="white" mb={4}>
              My Resume
            </Heading>
            <Box
              w="60px"
              h="3px"
              bgGradient="linear(to-r, blue.400, purple.500)"
              mx="auto"
              borderRadius="full"
            />
          </Box>
        </motion.div>

        {/* Tab Navigation */}
        <Box display="flex" justifyContent="center" mb={12}>
          <Box bg="gray.100" borderRadius="lg" p={1}>
            <ButtonGroup spacing={0}>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  px={6}
                  py={3}
                  borderRadius="md"
                  fontWeight="semibold"
                  transition="all 0.3s"
                  bg={activeTab === tab.id ? "blue.600" : "transparent"}
                  color={activeTab === tab.id ? "white" : "gray.600"}
                  boxShadow={activeTab === tab.id ? "lg" : "none"}
                  _hover={{
                    color: activeTab === tab.id ? "white" : "blue.600"
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>

        {/* Tab Content */}
        <Box maxW="5xl" mx="auto">
          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box position="relative">
                {/* Center line — desktop */}
                <Box
                  display={{ base: "none", md: "block" }}
                  position="absolute"
                  left="50%"
                  top={0}
                  bottom={0}
                  w="2px"
                  transform="translateX(-50%)"
                  bgGradient="linear(to-b, blue.500, purple.600)"
                  opacity={0.35}
                />
                {/* Left line — mobile */}
                <Box
                  display={{ base: "block", md: "none" }}
                  position="absolute"
                  left="10px"
                  top={0}
                  bottom={0}
                  w="2px"
                  bgGradient="linear(to-b, blue.500, purple.600)"
                  opacity={0.35}
                />

                <VStack spacing={8} align="stretch">
                  {experiences.map((exp, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: index * 0.12 }}
                      >
                        {/* Mobile: single column */}
                        <Box display={{ base: "block", md: "none" }} pl={8} position="relative">
                          <Box
                            position="absolute"
                            left="4px"
                            top="22px"
                            w="14px"
                            h="14px"
                            borderRadius="full"
                            bgGradient="linear(to-br, blue.400, purple.500)"
                            boxShadow="0 0 12px rgba(66,153,225,0.75)"
                            zIndex={1}
                          />
                          <ExperienceCard exp={exp} />
                        </Box>

                        {/* Desktop: alternating */}
                        <Box
                          display={{ base: "none", md: "flex" }}
                          alignItems="flex-start"
                          position="relative"
                        >
                          {/* Left half */}
                          <Box w="50%" pr={8} display="flex" justifyContent="flex-end">
                            {isLeft && <Box w="full"><ExperienceCard exp={exp} /></Box>}
                          </Box>

                          {/* Center dot */}
                          <Box
                            position="absolute"
                            left="50%"
                            transform="translateX(-50%)"
                            top="22px"
                            w="16px"
                            h="16px"
                            borderRadius="full"
                            bgGradient="linear(to-br, blue.400, purple.500)"
                            boxShadow="0 0 14px rgba(66,153,225,0.8)"
                            zIndex={1}
                          />

                          {/* Right half */}
                          <Box w="50%" pl={8}>
                            {!isLeft && <ExperienceCard exp={exp} />}
                          </Box>
                        </Box>
                      </motion.div>
                    );
                  })}
                </VStack>
              </Box>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={6} align="stretch">
                {education.map((edu) => (
                  <Box
                    key={edu.id}
                    bg="rgba(255,255,255,0.04)"
                    border="1px solid rgba(255,255,255,0.08)"
                    borderRadius="xl"
                    p={6}
                    transition="all 0.3s"
                    _hover={{
                      bg: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(99,179,237,0.3)"
                    }}
                  >
                    <Box
                      display={{ base: "block", md: "flex" }}
                      alignItems={{ md: "center" }}
                      justifyContent={{ md: "space-between" }}
                      mb={2}
                    >
                      <Heading fontSize="xl" fontWeight="bold" color="white">
                        {edu.degree}
                      </Heading>
                      <Text color="blue.300" fontWeight="semibold" fontSize="sm" mt={{ base: 1, md: 0 }}>
                        {edu.startDate} — {edu.endDate}
                      </Text>
                    </Box>
                    <Text color="purple.300" fontWeight="semibold" mb={1}>
                      {edu.institution}
                    </Text>
                    <Text color="gray.400" fontSize="sm">{edu.field}</Text>
                  </Box>
                ))}
              </VStack>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
                {skills.map((skillGroup, index) => (
                  <Box
                    key={index}
                    bg="rgba(255,255,255,0.04)"
                    border="1px solid rgba(255,255,255,0.08)"
                    borderRadius="xl"
                    p={6}
                    transition="all 0.3s"
                    _hover={{
                      bg: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(99,179,237,0.3)"
                    }}
                  >
                    <Heading fontSize="md" fontWeight="semibold" color="blue.300" mb={4} letterSpacing="wider" textTransform="uppercase">
                      {skillGroup.category}
                    </Heading>
                    <HStack flexWrap="wrap" spacing={2}>
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Text
                          key={skillIndex}
                          px={3}
                          py={1}
                          bg="rgba(66,153,225,0.12)"
                          color="gray.200"
                          fontSize="sm"
                          borderRadius="full"
                          border="1px solid rgba(66,153,225,0.2)"
                          _hover={{ bg: "rgba(66,153,225,0.25)", color: "white" }}
                          transition="all 0.2s"
                        >
                          {skill}
                        </Text>
                      ))}
                    </HStack>
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ResumeSection;
