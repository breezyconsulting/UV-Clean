// UV Sterile Australia — site interactions

// ===== Nav toggle (mobile) =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));
}

// ===== Year stamp in footer =====
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ===== Form handler =====
// Submits to FormSubmit.co AJAX endpoint. Shows in-page confirmation on success,
// and a graceful error with fallback contact details on failure.
// NOTE: The FIRST submission after deployment sends an activation email to the
// recipient — the recipient must click the confirmation link before the endpoint
// starts forwarding real submissions.
document.querySelectorAll('form.uv-form').forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const endpoint = form.dataset.endpoint;
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    // Honeypot: if a bot filled the hidden field, silently discard
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) {
      return;
    }

    // Basic required-field check (browser normally handles this, but preventDefault bypasses)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Collect fields as JSON
    const data = Object.fromEntries(new FormData(form).entries());
    // Special FormSubmit hidden fields
    if (form.dataset.subject) data._subject = form.dataset.subject;
    data._captcha = 'false';
    data._template = 'table';
    // Remove honeypot from payload
    delete data._honey;

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    if (status) {
      status.className = 'form-status is-loading';
      status.textContent = 'Sending your message…';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let payload = {};
      try { payload = await response.json(); } catch (_) { /* non-JSON response */ }

      const ok = response.ok && (payload.success === 'true' || payload.success === true);

      if (ok) {
        // Success — hide the form controls, show confirmation
        form.querySelectorAll('input, textarea, select, button, label, .form-row, .form-grid').forEach(el => {
          el.style.display = 'none';
        });
        if (status) {
          status.className = 'form-status is-success';
          status.innerHTML =
            '<strong>Thanks — your message is on its way.</strong>' +
            '<p>We\'ll respond within one business day. For urgent enquiries, call ' +
            '<a href="tel:+61417631743">0417 631 743</a>.</p>';
        }
      } else {
        throw new Error(payload.message || 'Submission failed');
      }
    } catch (err) {
      if (status) {
        status.className = 'form-status is-error';
        status.innerHTML =
          '<strong>Something went wrong.</strong>' +
          '<p>Please try again, or email us directly at ' +
          '<a href="mailto:uvsterileaustralia@gmail.com">uvsterileaustralia@gmail.com</a> ' +
          'or call <a href="tel:+61417631743">0417 631 743</a>.</p>';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
});
