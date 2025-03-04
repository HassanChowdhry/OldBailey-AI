"use client"

import Link from "next/link"
import { ArrowRight, Scale, Search, LineChart, Users, BookOpen, Building2, Mail, Github, Linkedin } from "lucide-react"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const features = [
  {
    title: "Historical Data Analysis",
    description:
      "Gain valuable insights into historical trends through comprehensive analysis of the Old Bailey dataset.",
    icon: LineChart,
    logo: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Interactive Role-Play",
    description: "Experience history firsthand by role-playing as historical figures from the era.",
    icon: Users,
    logo: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Advanced Search",
    description: "Powerful search capabilities to find specific cases and patterns in historical records.",
    icon: Search,
    logo: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Academic Research",
    description: "Support for academic research with detailed citations and historical context.",
    icon: BookOpen,
    logo: "/placeholder.svg?height=64&width=64",
  },
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black-0 text-white-1 scroll-smooth">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6" />
          <span className="text-xl font-bold">Old Bailey AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="hover:text-gray-300 transition-colors">
            Features
          </Link>
          <Link href="#about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="#old-bailey" className="hover:text-gray-300 transition-colors">
            Old Bailey
          </Link>
          <Link href="#contact" className="hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            Log in
          </Link>
          <Link href="/signup" className="px-4 py-2 rounded-md bg-white-1 text-black-0 hover:bg-gray-200 transition-colors">
            Sign up
          </Link>
        </div>
      </nav>

      <TracingBeam>
        <div className="space-y-20 pb-20">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center">
            <motion.div
              className="container mx-auto px-6 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                variants={fadeInUpVariants}
              >
                Explore History Through AI
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                variants={fadeInUpVariants}
              >
                OldBailey AI enhances historical research by providing advanced data analysis and immersive role-play
                capabilities through the Old Bailey dataset.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                variants={fadeInUpVariants}
              >
                <Link
                  href="/getstarted"
                  className="px-8 py-4 rounded-md bg-white-1 text-black-0 hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 rounded-md border border-gray-600 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-gray-950/50">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUpVariants}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Features</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Discover how OldBailey AI can enhance your historical research and exploration
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <motion.div 
                          className="flex items-center mb-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="p-3 rounded-lg bg-gray-700/50">
                            <feature.icon className="h-8 w-8 text-gray-100" />
                          </div>
                        </motion.div>
                        <CardTitle className="text-white-1 text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20">
            <motion.div
              className="container mx-auto px-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUpVariants}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">About Old Bailey AI</h2>
                <p className="text-xl text-gray-300 mb-6">
                  Old Bailey AI is designed to enhance historical research by offering advanced data analysis and
                  immersive role-play capabilities. By analyzing the Old Bailey dataset, this AI provides valuable
                  insights into historical trends and helps users explore history in a more interactive and engaging
                  way.
                </p>
                <p className="text-xl text-gray-300">
                  The project leverages OpenAI to analyze the Old Bailey dataset, utilizing prompt engineering to create
                  an AI capable of analyzing historic trends, generating tables, and role-playing as people from that
                  era.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Old Bailey Section */}
          <section id="old-bailey" className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                className="max-w-4xl mx-auto"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUpVariants}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">The Old Bailey and Its Proceedings</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader>
                      <motion.div 
                        className="flex items-center mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="p-3 rounded-lg bg-gray-700/50">
                          <Building2 className="h-8 w-8 text-gray-100" />
                        </div>
                      </motion.div>
                      <CardTitle className="text-white-1 text-2xl mb-4">What is Old Bailey?</CardTitle>
                      <CardDescription className="text-gray-300">
                        The Old Bailey, also known as the Central Criminal Court of England and Wales, is a court in
                        central London that has heard major criminal cases since the 16th century. It has been a symbol
                        of justice and law in London for centuries, playing a crucial role in the British legal system.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader>
                      <motion.div 
                        className="flex items-center mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="p-3 rounded-lg bg-gray-700/50">
                          <BookOpen className="h-8 w-8 text-gray-100" />
                        </div>
                      </motion.div>
                      <CardTitle className="text-white-1 text-2xl mb-4">The Proceedings of the Old Bailey</CardTitle>
                      <CardDescription className="text-gray-300">
                        The Proceedings of the Old Bailey, 1674-1913, is a fully searchable edition of the largest body
                        of texts detailing the lives of non-elite people ever published. It contains 197,752 criminal
                        trials held at London's central criminal court and 475 Ordinary's Accounts of the lives of
                        executed convicts.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <p className="text-xl text-gray-300 mt-8">
                  This extensive collection provides an unparalleled insight into criminal justice, London's history,
                  and the lives of Britons between the late 17th and early 20th centuries. Old Bailey AI leverages this
                  rich dataset to offer unique historical analysis and immersive experiences.
                </p>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900 to-purple-900 p-12 rounded-2xl"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUpVariants}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-3xl font-bold mb-6">Ready to Explore History?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join Old Bailey AI today and discover new insights into historical data.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/signup"
                    className="px-8 py-4 rounded-md bg-white-1 text-black-0 hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-4 rounded-md border border-gray-300 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Log In
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </TracingBeam>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Old Bailey AI</h3>
              <p className="text-gray-400">Enhancing historical research through AI</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold mb-2">Contact</h4>
              <Link href="mailto:hassan.chowdhry@dal.ca" className="text-gray-400 hover:text-white-1 flex items-center">
                <Mail className="h-4 w-4 mr-2" /> hassan.chowdhry@dal.ca
              </Link>
              <Link
                href="https://linkedin.com/in/hassan-chowdhry"
                className="text-gray-400 hover:text-white-1 flex items-center"
              >
                <Linkedin className="h-4 w-4 mr-2" /> Hassan Chowdhry
              </Link>
              <Link href="https://hassanchowdhry.live" className="text-gray-400 hover:text-white-1 flex items-center">
                <Github className="h-4 w-4 mr-2" /> HassanChowdhry.live
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>
              Reference: Tim Hitchcock, Robert Shoemaker, Clive Emsley, Sharon Howard and Jamie McLaughlin, et al., The
              Old Bailey Proceedings Online, 1674-1913 (www.oldbaileyonline.org, version 9.0, Autumn 2023).
            </p>
            <p className="mt-4">© {new Date().getFullYear()} Old Bailey AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}