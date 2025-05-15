
import { useEffect } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - Daniel C. Brown";
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 tech-gradient-text">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>Last updated: May 15, 2025</p>
            
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the website.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The website and its original content, features, and functionality are owned by Daniel C. Brown and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h2>User Content</h2>
            <p>
              When you submit content to our website, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your content.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Daniel C. Brown, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use the website</li>
              <li>Any conduct or content of any third party on the website</li>
              <li>Any content obtained from the website</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2>Disclaimer</h2>
            <p>
              Your use of the website is at your sole risk. The website is provided on an "AS IS" and "AS AVAILABLE" basis. The website is provided without warranties of any kind, whether express or implied.
            </p>
            
            <h2>Links to Other Websites</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Daniel C. Brown. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Illinois, without regard to its conflict of law provisions.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. By continuing to access or use our website after any revisions become effective, you agree to be bound by the revised terms.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
