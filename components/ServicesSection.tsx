import { motion } from "framer-motion";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ServicesSectionProps {
  services?: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services = [] }) => {
  const defaultServices = [
    {
      id: 1,
      title: "Front End Development",
      description: "Pixel perfect UI, with amazing UX interfaces.",
      icon: "🎨"
    },
    {
      id: 2,
      title: "Back End Development",
      description: "Extensive knowledge on internal and external API's.",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "Full Stack Development",
      description: "Front End, Back End, Database Collection.",
      icon: "🚀"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const bgColor = useColorModeValue("#1d191f", "#1d191f");
  const cardBg = useColorModeValue("#fff", "gray.700");
  const cardBorder = useColorModeValue("gray.200", "gray.600");

  return (
    <Box id="about" py={20} bg={bgColor}>
      <Container maxW="container.xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={4} textAlign="center" mb={16}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={useColorModeValue("#c3cede", "white")}
            >
              What I Do
            </Heading>
          </VStack>
        </motion.div>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Box
                bg={bgColor}
                rounded="lg"
                shadow="-12px -4px 21px -5px rgba(8,8,8)"
                transition="all 0.3s"
                p={8}
                textAlign="center"
                role="group"
                borderWidth="1px"
                borderColor={cardBorder}
                _hover={{
                  transform: "translateY(-8px)"
                }}
              >
                <Text
                  fontSize="4xl"
                  mb={6}
                  _hover={{
                    transform: "translateY(-8px)"
                  }}
                  transition="transform 0.3s"
                >
                  {service.icon}
                </Text>

                <Heading
                  fontSize="xl"
                  fontWeight="bold"
                  color={useColorModeValue("gray.900", "white")}
                  mb={4}
                >
                  {service.title}
                </Heading>

                <Text color={useColorModeValue("gray.600", "gray.300")} lineHeight="relaxed">
                  {service.description}
                </Text>

                <Box mt={6}>
                  <Box w="full" h="1" bg={useColorModeValue("gray.200", "gray.600")} rounded="full">
                    <Box
                      h="1"
                      bgGradient="linear(to-r, blue.500, purple.600)"
                      rounded="full"
                      _groupHover={{
                        bgGradient: "linear(to-r, purple.500, blue.600)"
                      }}
                      transition="all 0.5s"
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
