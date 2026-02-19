import { motion } from "framer-motion";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Link,
  Icon,
  Flex,
  Badge
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

interface PortfolioProject {
  name: string;
  url?: string;
  technologies: string[];
  type: "professional" | "personal";
}

interface PortfolioSectionProps {
  projects: PortfolioProject[];
  title: string;
  type: "professional" | "personal";
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects, title, type }) => {
  const filteredProjects = projects.filter((project) => project.type === type);

  return (
    <Box as="section" id={type === "professional" ? "portfolio" : undefined} py={20} bg="#1d191f">
      <Container maxW="container.xl" px={6}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="white" mb={4}>
              {title}
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

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Box
                bg="rgba(255,255,255,0.04)"
                border="1px solid rgba(255,255,255,0.08)"
                borderRadius="xl"
                p={6}
                role="group"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(99,179,237,0.3)",
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                }}
              >
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Heading
                    fontSize="xl"
                    fontWeight="bold"
                    color="white"
                    _groupHover={{ color: "blue.300" }}
                    transition="color 0.3s"
                  >
                    {project.url ? (
                      <Link href={project.url} isExternal _hover={{ textDecoration: "none" }}>
                        {project.name}
                      </Link>
                    ) : (
                      project.name
                    )}
                  </Heading>
                  {project.url && (
                    <Link
                      href={project.url}
                      isExternal
                      color="gray.600"
                      _groupHover={{ color: "blue.300" }}
                      transition="color 0.3s"
                    >
                      <Icon as={FiExternalLink} boxSize={5} />
                    </Link>
                  )}
                </Flex>

                <Flex wrap="wrap" gap={2}>
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      px={3}
                      py={1}
                      bg="rgba(66,153,225,0.12)"
                      color="blue.300"
                      fontSize="xs"
                      fontWeight="medium"
                      borderRadius="full"
                      border="1px solid rgba(66,153,225,0.25)"
                      textTransform="none"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default PortfolioSection;
