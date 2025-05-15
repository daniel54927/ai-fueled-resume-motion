
import { useEffect } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Daniel C. Brown";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 tech-gradient-text">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>Last updated: May 15, 2025</p>
            
            <h2>Introduction</h2>
            <p>
              Welcome to Daniel C. Brown's website. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              When you visit our website, we may collect the following types of information:
            </p>
            <ul>
              <li>Personal information (such as name and email) that you voluntarily provide when contacting us</li>
              <li>Usage data (such as IP address, browser type, pages visited)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To send you updates and marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites and encourage you to read their privacy policies.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to data portability</li>
            </ul>
            
            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: danie.brown@deepfrog.app</li>
              <li>Address: Lakehurst Drive, Waukegan, IL 60085</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
