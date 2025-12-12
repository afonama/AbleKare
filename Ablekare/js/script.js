const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm'); 
const submitButton = document.getElementById('submit'); 
const myH3 = document.getElementById('myH3');
const mainContent = document.getElementById("mainContent");
const openCaregiverBtn = document.getElementById("openCaregiverBtn");
const openRequestBtn = document.getElementById("openRequestBtn");
const overlayCaregiver = document.getElementById("overlayCaregiver");
const overlayRequest = document.getElementById("overlayRequest");
const thankYouPopup = document.getElementById("thankYouPopup");
const closeThankYou = document.getElementById("closeThankYou");
const requestForm = document.getElementById("requestForm");
const caregiverForm = document.getElementById("caregiverForm");
const container = document.querySelector('.date-range');
const inputs = container.querySelectorAll('input[type="date"]');
const start = inputs[0];
const end = inputs[1];
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("emailInput");
const form = document.getElementById('rangeForm') || container.closest('form'); 

  hamburger.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  });
if (contactForm && submitButton) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const serviceId = 'service_fgxl1i7';
        const templateId = 'template_0yybs8n';
        const params = {
            fullName: document.getElementById('fullName').value,
            emailInput: document.getElementById('emailInput').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            message: document.getElementById('message').value
        };
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        emailjs.send(serviceId, templateId, params)
            .then(res => {
                console.log('Email sent!', res.status);
                submitButton.textContent = 'Sent! 🎉';
                contactForm.reset();                
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, 2500);
                myH3.textContent='Message sent sucessfully';
                myH3.style.color = 'green'
            })
            .catch(error => {
                console.error('Email failed:', error);
                submitButton.textContent = 'Failed';
                submitButton.disabled = false;
                myH3.textContent='Failed to send message';
                myH3.style.color = 'red'
            });
    });
}
openCaregiverBtn.addEventListener("click", () => {
    overlayCaregiver.classList.add("active");
    mainContent.classList.add("blur");
    document.body.classList.add("no-scroll");
});
openRequestBtn.addEventListener("click", () => {
    overlayRequest.classList.add("active");
    mainContent.classList.add("blur");
    document.body.classList.add("no-scroll");
});
document.querySelectorAll(".closeOverlay").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        document.getElementById(target).classList.remove("active");
        mainContent.classList.remove("blur");
        document.body.classList.remove("no-scroll");
    });
});
let activeForm = null;
function showThankYou() {
    thankYouPopup.style.display = "flex";
}
closeThankYou.addEventListener("click", () => {
    thankYouPopup.style.display = "none";
    if (activeForm) {
        activeForm.reset();
        activeForm = null;
    }
});
requestForm.addEventListener("submit", function(e) {
    e.preventDefault();
    activeForm = requestForm;  
    showThankYou();
});
caregiverForm.addEventListener("submit", function(e) {
    e.preventDefault();
    activeForm = caregiverForm;
    showThankYou();
});
document.getElementById("requestForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = {
    name: this.name.value,
    age: this.age.value,
    number: this.number.value,
    email: this.email.value,
    address: this.address.value,
    careType: this.careType.value,
    hoursPerWeek: this.hoursPerWeek.value,
    careMode: this.careMode.value,
    challenges: this.challenges.value,
    startDate: this.startDate.value,
    endDate: this.endDate.value
  };
  fetch("https://script.google.com/macros/s/AKfycbyBrXJDhtr0w8SAEks2g8xN_snxRA5AqOGlDoW8akzql_ZbM87ekl_kCk4K0mseFsXn/exec", {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, 
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === "Success") {
      document.getElementById("thankYouPopup").style.display = "flex";
      this.reset();
    } else {
      alert("Error submitting form: " + data.message);
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
    alert("Unexpected error. Check console.");
  });
});
document.getElementById("caregiverForm").addEventListener("submit", function(e){
    e.preventDefault(); 
    const formData = {
        formType: "caregiver", 
        fullName: this.fullName.value,
        age: this.age.value,
        number: this.number.value,
        email: this.email.value,
        address: this.address.value,
        experience: this.experience.value,
        reason: this.reason.value
    };
    fetch("https://script.google.com/macros/s/AKfycbwIN-eOx4adsSgwb9ttzq8nU2f3B6V1VADivnEhU6IrMSsdUzqYn1g8YbSpb5334i16/exec", { // replace with your deployed Web App URL
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, 
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "Success") {
            document.getElementById("thankYouPopup").style.display = "flex";
            this.reset();
        } else {
            alert("Error submitting form: " + data.message);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Unexpected error. Check console.");
    });
});
const isBefore = (a, b) => {
    if (!a || !b) return false;
    return a < b; 
  };

  function syncEndMin() {
    if (start.value) {
      end.min = start.value;
    } else {
      end.removeAttribute('min');
    }
  }
  function validateEnd() {
    end.setCustomValidity('');
    if (start.value && end.value && isBefore(end.value, start.value)) {
      end.setCustomValidity('End date cannot be before start date.');
      return false;
    }
    return true;
  }
  syncEndMin();
  validateEnd();
  start.addEventListener('input', () => {
    syncEndMin();

    if (end.value && isBefore(end.value, start.value)) {
       validateEnd();
      end.reportValidity();
    } else {
      end.setCustomValidity('');
    }
  });
  end.addEventListener('input', () => {
    validateEnd();
  });
  if (form) {
    form.addEventListener('submit', (e) => {
      const ok = validateEnd();
      if (!ok) {
        e.preventDefault();
        end.reportValidity();
      }
    });
  }
    nameInput.addEventListener("input", () => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(nameInput.value)) {
            nameInput.setCustomValidity("Name can only contain letters.");
        } else {
            nameInput.setCustomValidity(""); 
        }
    });
    emailInput.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailInput.value)) {
        emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
        emailInput.setCustomValidity(""); 
    }
});