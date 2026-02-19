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
  Circle
} from "@chakra-ui/react";
import { FiPhone, FiMail } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjs";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_name: personalInfo.name,
        to_email: personalInfo.email
      };
console.log(EMAILJS_CONFIG.PUBLIC_KEY);
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = {
    bg: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "lg",
    _placeholder: { color: "gray.500" },
    _focus: {
      bg: "rgba(255,255,255,0.09)",
      border: "1px solid rgba(99,179,237,0.5)",
      boxShadow: "none"
    }
  };

  return (
    <Box as="section" id="contact" py={20} bg="#1d191f">
      <Container maxW="container.xl" px={6}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="white" mb={4}>
              Connect With Me
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

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} maxW="6xl" mx="auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box
              bg="rgba(255,255,255,0.04)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="xl"
              backdropFilter="blur(4px)"
              p={8}
              h="full"
            >
              <VStack textAlign="center" mb={8}>
                <Circle
                  size="32"
                  bgGradient="linear(to-br, blue.500, purple.600)"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                  mb={4}
                  boxShadow="0 0 30px rgba(66,153,225,0.3)"
                >
                  VV
                </Circle>
                <Heading fontSize="2xl" fontWeight="bold" color="white">
                  {personalInfo.name}
                </Heading>
                <Text color="gray.400">{personalInfo.title}</Text>
              </VStack>

              <VStack spacing={4} align="stretch" mb={8}>
                <HStack>
                  <Circle size="10" bg="rgba(66,153,225,0.15)" color="blue.300">
                    <Icon as={FiPhone} boxSize={4} />
                  </Circle>
                  <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">Phone</Text>
                    <Link
                      href={`tel:${personalInfo.phone}`}
                      color="gray.200"
                      _hover={{ color: "blue.300" }}
                      transition="color 0.3s"
                      fontSize="sm"
                    >
                      {personalInfo.phone}
                    </Link>
                  </Box>
                </HStack>

                <HStack>
                  <Circle size="10" bg="rgba(66,153,225,0.15)" color="blue.300">
                    <Icon as={FiMail} boxSize={4} />
                  </Circle>
                  <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">Email</Text>
                    <Link
                      href={`mailto:${personalInfo.email}`}
                      color="gray.200"
                      _hover={{ color: "blue.300" }}
                      transition="color 0.3s"
                      fontSize="sm"
                    >
                      {personalInfo.email}
                    </Link>
                  </Box>
                </HStack>
              </VStack>

              <Box>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={4}>
                  Find Me On
                </Text>
                <HStack spacing={3}>
                  <Link
                    href={personalInfo.linkedin}
                    isExternal
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="11"
                    h="11"
                    bg="rgba(66,153,225,0.12)"
                    borderRadius="full"
                    color="blue.300"
                    border="1px solid rgba(66,153,225,0.25)"
                    _hover={{ bg: "blue.600", color: "white", border: "1px solid transparent" }}
                    transition="all 0.3s"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href={personalInfo.github}
                    isExternal
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="11"
                    h="11"
                    bg="rgba(66,153,225,0.12)"
                    borderRadius="full"
                    color="blue.300"
                    border="1px solid rgba(66,153,225,0.25)"
                    _hover={{ bg: "blue.600", color: "white", border: "1px solid transparent" }}
                    transition="all 0.3s"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
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
              bg="rgba(255,255,255,0.04)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="xl"
              backdropFilter="blur(4px)"
              p={8}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                <FormControl isRequired>
                  <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} {...inputStyles} />
                </FormControl>
                <FormControl>
                  <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} {...inputStyles} />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                <FormControl isRequired>
                  <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} {...inputStyles} />
                </FormControl>
                <FormControl isRequired>
                  <Input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} {...inputStyles} />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired mb={6}>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={7}
                  value={formData.message}
                  onChange={handleInputChange}
                  {...inputStyles}
                />
              </FormControl>

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, blue.500, purple.600)"
                color="white"
                fontWeight="semibold"
                py={6}
                borderRadius="lg"
                _hover={{
                  bgGradient: "linear(to-r, blue.400, purple.500)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 25px rgba(66,153,225,0.35)"
                }}
                transition="all 0.3s"
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </Box>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ContactSection;
