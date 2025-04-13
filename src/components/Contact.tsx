
import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      
      // Reset status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-tech-dark contact-section">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline text-white">Get In Touch</h2>
          <p className="text-gray-200 max-w-3xl mx-auto">
            Have a question or want to start your digital adventure? Feel free to contact me.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-tech-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Email</h4>
                  <a href="mailto:daniel.brown@deepfrog.app" className="text-tech-blue hover:underline">
                    daniel.brown@deepfrog.app
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-tech-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Phone</h4>
                  <a href="tel:+18474547221" className="text-tech-blue hover:underline">
                    (847) 454-7221
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-tech-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Location</h4>
                  <p className="text-gray-200">Waukegan, IL 60085</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/20 p-3 rounded-full mr-4">
                  <Linkedin className="h-6 w-6 text-tech-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-white">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/daniel-charles-brown/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-tech-blue hover:underline"
                  >
                    daniel-charles-brown
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue bg-tech-dark/80 text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-white">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue bg-tech-dark/80 text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue bg-tech-dark/80 text-white"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full px-6 py-3 text-white rounded-lg transition-all ${
                  formStatus === 'submitting' 
                    ? 'bg-tech-purple/70 cursor-not-allowed' 
                    : 'bg-tech-purple hover:bg-tech-purple/90'
                } font-medium`}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus === 'success' && (
                <div className="p-4 bg-green-900/50 text-green-300 rounded-lg">
                  Your message has been sent successfully!
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-4 bg-red-900/50 text-red-300 rounded-lg">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
