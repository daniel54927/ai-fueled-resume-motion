
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
    <section id="contact" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-tech-dark dark:to-tech-dark">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Get In Touch</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Have a question or want to work together? Feel free to contact me.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-tech-blue/10 dark:bg-tech-blue/30 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-tech-blue dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:daniel.brown@deepfrog.app" className="text-tech-blue hover:underline dark:text-tech-blue">
                    daniel.brown@deepfrog.app
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/10 dark:bg-tech-blue/30 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-tech-blue dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+18474547221" className="text-tech-blue hover:underline dark:text-tech-blue">
                    (847) 454-7221
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/10 dark:bg-tech-blue/30 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-tech-blue dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="dark:text-gray-200">Waukegan, IL 60085</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-blue/10 dark:bg-tech-blue/30 p-3 rounded-full mr-4">
                  <Linkedin className="h-6 w-6 text-tech-blue dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/daniel-charles-brown/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-tech-blue hover:underline dark:text-tech-blue"
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
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue dark:bg-tech-dark/80 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue dark:bg-tech-dark/80 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue dark:bg-tech-dark/80 dark:border-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full px-6 py-3 text-white rounded-lg transition-all ${
                  formStatus === 'submitting' 
                    ? 'bg-tech-blue/70 dark:bg-tech-purple/70 cursor-not-allowed' 
                    : 'bg-tech-blue dark:bg-tech-purple hover:bg-tech-blue/90 dark:hover:bg-tech-purple/90'
                } font-medium`}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg">
                  Your message has been sent successfully!
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
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
