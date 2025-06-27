import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show sarcastic success message
    toast({
      title: "Message Sent! 🚀",
      description: "Just kidding, this is a demo! But I appreciate the thought. 😄",
      duration: 5000,
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // Add confetti effect
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎉🎊✨🎉🎊✨';
    confetti.style.position = 'fixed';
    confetti.style.top = '50%';
    confetti.style.left = '50%';
    confetti.style.transform = 'translate(-50%, -50%)';
    confetti.style.fontSize = '3rem';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);

    setTimeout(() => {
      document.body.removeChild(confetti);
    }, 3000);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = formData.name.trim() && 
                     formData.email.trim() && 
                     validateEmail(formData.email) && 
                     formData.message.trim();

  return (
    <div className="notebook-paper torn-edge p-8 rounded-lg">
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Label htmlFor="name" className="block text-gray-900 font-bold mb-2">
            Name <span className="annotation text-xs text-pink-400">(required for proper debugging)</span>
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-b-2 border-blue-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
            placeholder="Your awesome name here"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="block text-gray-900 font-bold mb-2">
            Email <span className="annotation text-xs text-pink-400">(no spam, I promise!)</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-b-2 border-blue-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
            placeholder="your.email@awesome.com"
            required
          />
          {formData.email && !validateEmail(formData.email) && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1 font-mono"
            >
              Error 400: Email format more broken than my code at 3 AM
            </motion.p>
          )}
        </div>

        <div>
          <Label htmlFor="message" className="block text-gray-900 font-bold mb-2">
            Message <span className="annotation text-xs text-pink-400">(tell me your bugs... I mean, ideas!)</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full p-3 rounded-lg border-b-2 border-blue-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors resize-none"
            placeholder="Describe your project, or just say hi! I don't bite... much."
            required
          />
        </div>

        <motion.div
          whileHover={{ scale: isFormValid ? 1.05 : 1 }}
          whileTap={{ scale: isFormValid ? 0.95 : 1 }}
        >
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-300 hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0"
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Pretending to send...</span>
              </motion.div>
            ) : (
              <>
                Send Message 🚀
                <div className="text-xs mt-1 opacity-75">
                  (May take 2-3 business coffees to respond)
                </div>
              </>
            )}
          </Button>
        </motion.div>

        {!isFormValid && formData.name && formData.email && formData.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-feature text-center text-sm"
          >
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Error 422: Please fix your email format, even I have standards!
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default ContactForm;
