import { motion } from "framer-motion";
import { useState } from "react";
import { PersonalInfo } from "../types/resume";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  FormControl,
  
  Input,
  Textarea,
  Button,
  Link,
  Icon,
  Circle,
  useColorModeValue
} from "@chakra-ui/react";
import { FiPhone, FiMail } from "react-icons/fi";

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
  };

  return (
    <Box as="section" id="contact" py={20} bg={useColorModeValue("#1d191f", "#1d191f")}>
      <Container maxW="container.xl" px={6}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="#c3cede" mb={4}>
              Connect With Me
            </Heading>
          </Box>
        </motion.div>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} maxW="6xl" mx="auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box bg="white" borderRadius="lg" boxShadow="lg" p={8}>
              <VStack textAlign="center" mb={8}>
                <Circle
                  size="32"
                  bgGradient="linear(to-br, blue.600, purple.600)"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                  mb={4}
                >
                  VV
                </Circle>
                <Heading fontSize="2xl" fontWeight="bold" color="gray.900">
                  {personalInfo.name}
                </Heading>
                <Text color="gray.600">{personalInfo.title}</Text>
              </VStack>

              <VStack spacing={4} align="stretch">
                <HStack>
                  <Circle size="10" bg="blue.100" color="blue.600">
                    <Icon as={FiPhone} boxSize={5} />
                  </Circle>
                  <Box>
                    <Text color="gray.600">Phone</Text>
                    <Link
                      href={`tel:${personalInfo.phone}`}
                      color="gray.900"
                      _hover={{ color: "blue.600" }}
                      transition="colors 0.3s"
                    >
                      {personalInfo.phone}
                    </Link>
                  </Box>
                </HStack>

                <HStack>
                  <Circle size="10" bg="blue.100" color="blue.600">
                    <Icon as={FiMail} boxSize={5} />
                  </Circle>
                  <Box>
                    <Text color="gray.600">Email</Text>
                    <Link
                      href={`mailto:${personalInfo.email}`}
                      color="gray.900"
                      _hover={{ color: "blue.600" }}
                      transition="colors 0.3s"
                    >
                      {personalInfo.email}
                    </Link>
                  </Box>
                </HStack>
              </VStack>

              <Box mt={8}>
                <Text color="gray.600" mb={4}>
                  FIND WITH ME
                </Text>
                <HStack spacing={4}>
                  <Link
                    href={personalInfo.linkedin}
                    isExternal
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="12"
                    h="12"
                    bg="blue.100"
                    borderRadius="full"
                    color="blue.600"
                    _hover={{ bg: "blue.600", color: "white" }}
                    transition="all 0.3s"
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href={personalInfo.github}
                    isExternal
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="12"
                    h="12"
                    bg="blue.100"
                    borderRadius="full"
                    color="blue.600"
                    _hover={{ bg: "blue.600", color: "white" }}
                    transition="all 0.3s"
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Link>
                </HStack>
              </Box>
            </Box>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              p={8}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    _focus={{
                      outline: "none",
                      ring: 2,
                      ringColor: "blue.600",
                      borderColor: "transparent"
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="PHONE NUMBER"
                    value={formData.phone}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    _focus={{
                      outline: "none",
                      ring: 2,
                      ringColor: "blue.600",
                      borderColor: "transparent"
                    }}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                <FormControl isRequired>
                  <Input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    _focus={{
                      outline: "none",
                      ring: 2,
                      ringColor: "blue.600",
                      borderColor: "transparent"
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="SUBJECT"
                    value={formData.subject}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    _focus={{
                      outline: "none",
                      ring: 2,
                      ringColor: "blue.600",
                      borderColor: "transparent"
                    }}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired mb={6}>
                <Textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  bg="gray.50"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  _focus={{
                    outline: "none",
                    ring: 2,
                    ringColor: "blue.600",
                    borderColor: "transparent"
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                w="full"
                bg="blue.600"
                _hover={{ bg: "blue.700" }}
                color="white"
                fontWeight="semibold"
                py={3}
                px={6}
                borderRadius="lg"
                transition="colors 0.3s"
                _focus={{
                  outline: "none",
                  ring: 2,
                  ringColor: "blue.600",
                  ringOffset: 2
                }}
              >
                SEND MESSAGE
              </Button>
            </Box>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ContactSection;
