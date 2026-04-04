import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Search, Smartphone, Cloud, TrendingUp, ArrowRight, Check } from 'lucide-react';

const Products = () => {
  const services = [
    {
      id: 1,
      name: 'Web Development',
      desc: 'From dynamic front-ends to robust back-ends, we build custom web applications tailored to your business needs, ensuring scalability and performance.',
      icon: Code,
      color: 'from-blue-500 to-indigo-600',
      features: ['React & Next.js', 'Node.js & Express', 'Database Design', 'API Development']
    },
    {
      id: 2,
      name: 'UI/UX Design',
      desc: 'Creating intuitive, engaging, and aesthetically pleasing user interfaces that enhance user experience, drive conversions, and reflect your brand identity.',
      icon: Palette,
      color: 'from-purple-500 to-pink-600',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
      id: 3,
      name: 'SEO Optimization',
      desc: 'Improve your online visibility and drive organic traffic with our comprehensive search engine optimization strategies, including keyword research, on-page, and technical SEO.',
      icon: Search,
      color: 'from-green-500 to-emerald-600',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Analytics']
    },
    {
      id: 4,
      name: 'Mobile App Development',
      desc: 'Develop native or cross-platform mobile applications for iOS and Android, ensuring seamless performance, engaging user experiences, and broad market reach.',
      icon: Smartphone,
      color: 'from-orange-500 to-red-600',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization']
    },
    {
      id: 5,
      name: 'Cloud Solutions',
      desc: 'Leverage the power of cloud computing with our expertise in AWS, Azure, and Google Cloud for scalable, secure, and cost-effective infrastructure management.',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-600',
      features: ['AWS & Azure', 'Cloud Migration', 'DevOps', 'Monitoring']
    },
    {
      id: 6,
      name: 'Digital Marketing Strategy',
      desc: 'Crafting data-driven digital marketing strategies to reach your target audience, build brand awareness, and achieve your business objectives.',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-600',
      features: ['Content Marketing', 'Social Media', 'Email Campaigns', 'Analytics']
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Products & Services
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3 }}
            >
              Comprehensive digital solutions designed to elevate your business and achieve your goals
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="w-24 h-1 bg-white/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 overflow-hidden h-full flex flex-col">
                    {/* Icon Header */}
                    <div className={`p-6 bg-gradient-to-br ${service.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                        {service.desc}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                          Key Features
                        </h4>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your digital goals
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;