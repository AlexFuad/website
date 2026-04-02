import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Palette, Cloud, Search, Star } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Building robust and scalable web applications.',
    icon: Code,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive and engaging user experiences.',
    icon: Palette,
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Cloud Solutions',
    description: 'Leveraging cloud power for efficiency and scalability.',
    icon: Cloud,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'SEO Optimization',
    description: 'Boosting your online visibility and organic traffic.',
    icon: Search,
    color: 'from-orange-500 to-red-600'
  }
];

const HeroSlides = [
  {
    title: 'Transform Your Vision into Digital Reality',
    subtitle: 'Modern web solutions that drive growth and innovation',
    cta: 'Get Started'
  },
  {
    title: 'Design That Converts',
    subtitle: 'Beautiful UI/UX that engages and retains users',
    cta: 'View Portfolio'
  },
  {
    title: 'Scale Without Limits',
    subtitle: 'Cloud-powered infrastructure for your business',
    cta: 'Learn More'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HeroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-pulse"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {HeroSlides[currentSlide].title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.3 }}
              >
                {HeroSlides[currentSlide].subtitle}
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  to="/contact"
                  className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3"
                >
                  {HeroSlides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/products"
                  className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-500"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {/* Slide indicators */}
          <div className="flex justify-center mt-16 space-x-2">
            {HeroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Our Core Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cutting-edge technologies and proven methodologies to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="card bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 transition-all duration-500 h-full flex flex-col items-center text-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 shadow-lg group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[150, 50, 100, 99].map((number, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-black mb-2">
                  +{number}
                </div>
                <div className="text-xl opacity-90 capitalize">
                  {['Projects', 'Clients', 'Awards', '% Satisfaction'][index]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
