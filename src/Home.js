import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Palette, Cloud, Search, Star, ChevronLeft, ChevronRight, Users, Award, Rocket } from 'lucide-react';

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
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HeroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Digitalita transformed our online presence completely. Their expertise in web development and design is outstanding. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director, GrowthCo',
      content: 'The team delivered beyond our expectations. Our new website has increased conversions by 40%. Amazing work!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, DesignHub',
      content: 'Professional, creative, and responsive. Digitalita is our go-to partner for all digital projects.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      name: 'David Park',
      role: 'CTO, InnovateTech',
      content: 'Their cloud solutions helped us scale efficiently. Excellent technical expertise and support.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const showcaseItems = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern, scalable e-commerce solution',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Corporate Website',
      description: 'Professional web presence for enterprise',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Tailwind', 'CMS']
    },
    {
      title: 'Mobile Application',
      description: 'Cross-platform mobile experience',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      tags: ['React Native', 'Firebase', 'iOS/Android']
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'D3.js', 'GraphQL']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden pt-24">
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

      {/* Project Showcase Section with Flex Layout */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our latest work and success stories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-200 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500"
            >
              View All Services
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Trusted by businesses worldwide for delivering exceptional digital solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: 'Fast Delivery',
                description: 'We deliver projects on time without compromising quality. Our agile process ensures rapid iteration and deployment.',
                color: 'from-orange-500 to-red-600'
              },
              {
                icon: Award,
                title: 'Award Winning',
                description: 'Recognized for excellence in design and development. Our work speaks for itself with multiple industry awards.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'A talented team of designers, developers, and strategists dedicated to your success.',
                color: 'from-blue-500 to-indigo-600'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg mb-6`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Real feedback from real partners who trusted us with their digital journey
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full mb-6 border-4 border-white shadow-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-2xl text-white font-semibold mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <h4 className="text-xl font-bold text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-blue-200">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-white w-12'
                    : 'bg-white/40 hover:bg-white/60 w-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
