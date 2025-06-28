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
  Badge,
  useColorModeValue
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

interface PortfolioProject {
  id: number;
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

  const bgColor = useColorModeValue("#1d191f", "#1d191f");

  const cardBg = useColorModeValue(
    type === "professional" ? "gray.50" : "white",
    type === "professional" ? "gray.700" : "gray.800"
  );

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
              {title}
            </Heading>
          </Box>
        </motion.div>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Box
                bg={cardBg}
                borderRadius="lg"
                boxShadow="lg"
                _hover={{
                  boxShadow: "xl",
                  transform: "translateY(-8px)"
                }}
                transition="all 0.3s"
                p={6}
                role="group"
              >
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Heading
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.900"
                    _groupHover={{ color: "blue.600" }}
                    transition="colors 0.3s"
                  >
                    {project.url ? (
                      <Link href={project.url} isExternal _hover={{ textDecoration: "underline" }}>
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
                      color="blue.600"
                      _hover={{ color: "blue.800" }}
                      transition="colors 0.3s"
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
                      bg="blue.100"
                      color="blue.800"
                      fontSize="sm"
                      fontWeight="medium"
                      borderRadius="full"
                      _hover={{ bg: "blue.200" }}
                      transition="colors 0.3s"
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
