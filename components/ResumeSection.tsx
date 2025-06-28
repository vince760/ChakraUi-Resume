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

  return (
    <Box as="section" py={20} bg={bgColor}>
      <Container maxW="container.xl" px={6}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="#c3cede" mb={4}>
              My Resume
            </Heading>
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
        <Box maxW="4xl" mx="auto">
          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={8} align="stretch">
                {experiences.map((exp, index) => (
                  <Box key={exp.id} borderLeft="4px" borderLeftColor="blue.600" pl={6} pb={8}>
                    <Box
                      display={{ base: "block", md: "flex" }}
                      alignItems={{ md: "center" }}
                      justifyContent={{ md: "space-between" }}
                      mb={3}
                    >
                      <Heading fontSize="2xl" fontWeight="bold" color="gray.900">
                        {exp.position}
                      </Heading>
                      <Text color="blue.600" fontWeight="semibold">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </Text>
                    </Box>
                    <Heading fontSize="xl" color="gray.700" mb={3}>
                      {exp.company}
                    </Heading>
                    <VStack spacing={2} align="stretch" color="gray.600">
                      {exp.description.map((desc, descIndex) => (
                        <HStack key={descIndex} align="flex-start">
                          <Text color="blue.600" mr={2} mt={2}>
                            •
                          </Text>
                          <Text>{desc}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    <HStack flexWrap="wrap" spacing={2} mt={4}>
                      {exp.technologies.map((tech, techIndex) => (
                        <Text
                          key={techIndex}
                          px={3}
                          py={1}
                          bg="gray.100"
                          color="gray.700"
                          fontSize="sm"
                          borderRadius="full"
                        >
                          {tech}
                        </Text>
                      ))}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={8} align="stretch">
                {education.map((edu, index) => (
                  <Box key={edu.id} borderLeft="4px" borderLeftColor="blue.600" pl={6} pb={8}>
                    <Box
                      display={{ base: "block", md: "flex" }}
                      alignItems={{ md: "center" }}
                      justifyContent={{ md: "space-between" }}
                      mb={3}
                    >
                      <Heading fontSize="2xl" fontWeight="bold" color="gray.900">
                        {edu.degree}
                      </Heading>
                      <Text color="blue.600" fontWeight="semibold">
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </Box>
                    <Heading fontSize="xl" color="gray.700" mb={2}>
                      {edu.institution}
                    </Heading>
                    <Text color="gray.600">{edu.field}</Text>
                    {edu.gpa && (
                      <Text color="gray.600" mt={2}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                    {edu.honors && edu.honors.length > 0 && (
                      <Box mt={3}>
                        <Text as="span" color="gray.700" fontWeight="semibold">
                          Honors:{" "}
                        </Text>
                        <Text as="span" color="gray.600">
                          {edu.honors.join(", ")}
                        </Text>
                      </Box>
                    )}
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
              <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                {skills.map((skillGroup, index) => (
                  <Box key={index} bg="gray.50" borderRadius="lg" p={6}>
                    <Heading fontSize="xl" fontWeight="bold" color="gray.900" mb={4}>
                      {skillGroup.category}
                    </Heading>
                    <HStack flexWrap="wrap" spacing={2}>
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Text
                          key={skillIndex}
                          px={3}
                          py={2}
                          bg="blue.100"
                          color="blue.800"
                          borderRadius="lg"
                          fontWeight="medium"
                          _hover={{ bg: "blue.200" }}
                          transition="colors 0.3s"
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
