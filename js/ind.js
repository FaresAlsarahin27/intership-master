const buttons = document.querySelectorAll(".intern-btn");

buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove "active" class from all buttons
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    // Add "active" class to clicked button
    this.classList.add('active');
  });
});
