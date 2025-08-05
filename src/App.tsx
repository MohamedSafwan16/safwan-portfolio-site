import { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Instagram, ExternalLink, Download, User, Briefcase, Code, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with WhatsApp integration
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Portfolio Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
Sent from Safwan's Portfolio Website`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/94754066304?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success popup
    setShowSuccessPopup(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Auto-hide popup after 4 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 4000);
  };

  // Close success popup manually
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };
  const services = [
    {
      title: 'Logo Design',
      description: 'Creating memorable brand identities that capture your essence',
      icon: '🎨'
    },
    {
      title: 'Brand Identity',
      description: 'Complete visual identity systems for consistent branding',
      icon: '🏢'
    },
    {
      title: 'Social Media Graphics',
      description: 'Eye-catching designs for all your social platforms',
      icon: '📱'
    },
    {
      title: 'Print Design',
      description: 'Professional materials from business cards to brochures',
      icon: '🖨️'
    },
    {
      title: 'Digital Marketing',
      description: 'Compelling visuals that drive engagement and conversions',
      icon: '📊'
    },
    {
      title: 'Custom Illustrations',
      description: 'Unique artwork tailored to your specific needs',
      icon: '✏️'
    }
  ];

  const skills = [
    { name: 'Canva', level: 95 },
    { name: 'Adobe Creative Suite', level: 85 },
    { name: 'Typography', level: 90 },
    { name: 'Color Theory', level: 88 },
    { name: 'Brand Development', level: 82 },
    { name: 'UI/UX Basics', level: 75 }
  ];

  const portfolioItems = [
    { category: 'Logo', title: 'Brand Identity Project', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { category: 'Social Media', title: 'Instagram Campaign', image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { category: 'Print', title: 'Business Card Design', image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { category: 'Branding', title: 'Complete Brand Package', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { category: 'Social Media', title: 'Facebook Ad Campaign', image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { category: 'Logo', title: 'Startup Logo Design', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-900/20 animate-in fade-in duration-300">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-300 mb-6">
                Your message has been sent via WhatsApp. I'll get back to you soon!
              </p>
              
              {/* Close Button */}
              <button
                onClick={closeSuccessPopup}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg shadow-red-900/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-white">
              SAF<span className="text-red-600">WAN</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Portfolio', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-500 ${
                    activeSection === item.toLowerCase() ? 'text-red-500' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Services', 'Portfolio', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-red-500 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-red-600 to-red-800 p-1 shadow-2xl shadow-red-900/50">
                  <img src="https://imgur.com/aCJWb9y"
                    alt="Safwan - Graphic Designer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/20 to-red-800/20 animate-pulse"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Hi, I'm <span className="text-red-500">Safwan</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl mb-6 text-gray-300">
                I'm a <span className="text-red-500 font-semibold">Graphic Designer</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl">
                With 3+ years of experience in creating stunning visual designs, I specialize in bringing brands to life through creative solutions. From concept to completion, I use tools like Canva to craft designs that captivate and convert.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                <a href="https://www.linkedin.com/in/mohamed-safwan-8b36282b4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/safwan_mhd16/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Instagram size={24} />
                </a>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <MessageCircle size={24} />
                </button>
                <a href="mailto:safanmohemed617@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Mail size={24} />
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg shadow-red-900/50"
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-red-600 text-red-500 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About <span className="text-red-500">Me</span></h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-red-500">Creative Designer & Visual Storyteller</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate graphic designer with over 3 years of experience in creating visual solutions that make brands stand out. My expertise lies in using Canva to create everything from social media graphics to complete brand identities.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                My approach combines creativity with strategic thinking to deliver designs that not only look great but also achieve business objectives. I believe in the power of visual communication to tell compelling stories and create meaningful connections.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-black/50 rounded-lg">
                  <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-black/50 rounded-lg">
                  <div className="text-3xl font-bold text-red-500 mb-2">3+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-black/50 rounded-lg">
                <User className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Client-Focused</h4>
                  <p className="text-gray-400 text-sm">Understanding your vision and bringing it to life</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-black/50 rounded-lg">
                <Briefcase className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Professional Quality</h4>
                  <p className="text-gray-400 text-sm">Delivering high-quality designs that exceed expectations</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-black/50 rounded-lg">
                <Code className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Modern Tools</h4>
                  <p className="text-gray-400 text-sm">Using the latest design tools and techniques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">My <span className="text-red-500">Services</span></h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I offer a comprehensive range of design services to help your brand stand out and make a lasting impression.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">My <span className="text-red-500">Portfolio</span></h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here's a showcase of some of my recent work. Each project represents a unique challenge and creative solution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-gray-800 hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-red-500 text-sm font-medium">{item.category}</span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">My <span className="text-red-500">Skills</span></h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are the tools and technologies I use to bring creative visions to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">{skill.name}</span>
                  <span className="text-red-500 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-700 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work <span className="text-red-500">Together</span></h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's discuss your project and create something amazing together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                   value={formData.subject}
                   onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200"
                    placeholder="Project Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg shadow-red-900/50"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="text-red-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-400">safanmohemed617@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MessageCircle className="text-red-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-400">+94754066304</p>
                </div>
              </div>
              
              <div className="pt-8">
                <h3 className="font-semibold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/mohamed-safwan-8b36282b4/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-600/10 transition-all duration-200">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/safwan_mhd16/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-600/10 transition-all duration-200">
                    <Instagram size={20} />
                  </a>
                  <a href="https://wa.me/94754066304" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-600/10 transition-all duration-200">
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Safwan. All rights reserved. Designed with ❤️ and creativity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;