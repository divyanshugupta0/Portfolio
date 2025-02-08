$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

   
    // slide-up script
    

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Editor", "Developer", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Editor", "Developer", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
    
});
//contact form codes
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Get the submit button and store original text
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if(response.ok) {
            showSuccessNotification("Message sent successfully!");
            e.target.reset();
        } else {
            showErrorNotification("Failed to send message. Please try again.");
        }
    } catch(err) {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showErrorNotification("An error occurred. Please try again later.");
    }
});

  /*----------------------============================CHATBOT================================-------------------------------*/


  





const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  
  let userMessage = null;
  const inputInitHeight = chatInput.scrollHeight;
  
  // Token system setup
  const MAX_TOKENS = 5;
  const TOKEN_RESET_HOURS = 24;
  
  const getTokenData = () => {
      const data = localStorage.getItem('chatTokens');
      if (!data) return { tokens: MAX_TOKENS, lastReset: Date.now() };
      return JSON.parse(data);
  };
  
  const updateTokens = () => {
      let data = getTokenData();
      const now = Date.now();
      const hoursSinceReset = (now - data.lastReset) / (1000 * 60 * 60);
      
      if (hoursSinceReset >= TOKEN_RESET_HOURS) {
          data = { tokens: MAX_TOKENS, lastReset: now };
      }
      
      return data;
  };
  
  const useToken = () => {
      const data = updateTokens();
      if (data.tokens <= 0) return false;
      
      data.tokens--;
      localStorage.setItem('chatTokens', JSON.stringify(data));
      return true;
  };
  
  const createChatLi = (message, className) => {
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", `${className}`);
      let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
      chatLi.innerHTML = chatContent;
      chatLi.querySelector("p").textContent = message;
      return chatLi;
  }
  
  const generateResponse = async (chatElement) => {
      const messageElement = chatElement.querySelector("p");
  
      const data = JSON.stringify({
          messages: [
              {
                  role: 'user',
                  content: userMessage
              }
          ],
          model: 'gpt-4o',
          max_tokens: 100,
          temperature: 0.9
      });
  
      try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

          const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                  'x-rapidapi-key': '1dcaa5af51mshcd138483c5307c4p185bbdjsn88c7f008dffe',
                  'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
                  'Content-Type': 'application/json'
              },
              body: data,
              signal: controller.signal
          });
          
          clearTimeout(timeoutId);

          if (!response.ok) {
              throw new Error('API request failed');
          }
          
          const result = await response.json();
          
          if (!result.choices || !result.choices[0] || !result.choices[0].message) {
              throw new Error('Invalid response format');
          }
          
          messageElement.textContent = result.choices[0].message.content;
          
      } catch (err) {
          console.error('Chat error:', err);
          messageElement.classList.add("error");
          if (err.name === 'AbortError') {
              messageElement.textContent = "Request timed out. Please try again later.";
          } else if (err.message.includes("timeout")) {
              messageElement.textContent = "The API is experiencing high traffic. Please try again in a few moments.";
          } else {
              messageElement.textContent = "SORRY! We are not available right now. Please try again later.";
          }
      }
      chatbox.scrollTo(0, chatbox.scrollHeight);
  }
  
  const handleChat = async () => {
      userMessage = chatInput.value.trim();
      if(!userMessage) return;
      
      const tokenData = updateTokens();
      if (tokenData.tokens <= 0) {
          chatbox.appendChild(createChatLi("You've reached your daily message limit. Please try again in 24 hours.", "incoming"));
          chatbox.scrollTo(0, chatbox.scrollHeight);
          return;
      }
      
      if (!useToken()) return;
  
      chatInput.value = "";
      chatInput.style.height = `${inputInitHeight}px`;
  
      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
      chatbox.appendChild(createChatLi(`Messages remaining today: ${tokenData.tokens - 1}`, "incoming"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
      
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      
      await generateResponse(incomingChatLi);
  }
  
  chatInput.addEventListener("input", () => {
      chatInput.style.height = `${inputInitHeight}px`;
      chatInput.style.height = `${chatInput.scrollHeight}px`;
  });
  
  chatInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
          e.preventDefault();
          handleChat();
      }
  });
  
  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => {
      document.body.classList.toggle("show-chatbot");
      const tokenData = updateTokens();
      if (tokenData.tokens > 0) {
          chatbox.appendChild(createChatLi(`You have ${tokenData.tokens} messages remaining today.`, "incoming"));
          chatbox.scrollTo(0, chatbox.scrollHeight);
      }
  });



