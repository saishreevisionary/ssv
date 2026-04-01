// Centralized Form Handler for SaiShree Media — form-handler.js
const WEB3FORMS_ACCESS_KEY = "21accaa4-b0d4-4239-a71b-976ae65ac9f5";

document.addEventListener('DOMContentLoaded', () => {
  const allForms = document.querySelectorAll('form');

  allForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Native browser validation check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Find relevant UI elements
      const btn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-form');
      const successMsg = form.querySelector('.form-success') || form.querySelector('.success-msg') || document.getElementById('formSuccess') || document.getElementById('contactSuccess');
      
      if (!btn) return;

      const originalBtnHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Prepare form data
      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      
      // Auto-generate subject based on form ID or title
      let subject = "New Inquiry — SaiShree Media";
      if (form.id === 'auditForm') subject = "New FREE AUDIT Request — SaiShree Media";
      else if (form.id === 'contactForm') subject = "New CONTACT MESSAGE — SaiShree Media";
      else if (form.id === 'webDevForm') subject = "WEB DEV Inquiry — SaiShree Media";
      else if (form.id === 'adsForm') subject = "PAID ADS Inquiry — SaiShree Media";
      else if (form.id === 'seoForm') subject = "SEO Inquiry — SaiShree Media";
      else if (form.id === 'smForm') subject = "SOCIAL MEDIA Inquiry — SaiShree Media";
      
      formData.append("subject", subject);
      formData.append("from_name", "SaiShree Visionary Website");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          form.reset();
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            alert("Thank you! Your message has been sent successfully.");
          }
        } else {
          console.error("Web3Forms Error:", data);
          alert("Something went wrong. Please try again or contact us via WhatsApp.");
        }
      } catch (error) {
        console.error("Submission Error:", error);
        alert("Connection error. Please check your internet and try again.");
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
      }
    });
  });
});
