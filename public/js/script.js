document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate roll number length
  if (this.rollNumber.value.length !== 6) {
    alert("Roll number must be 6 digits");
    return;
  }

  // Validate marks
  var physics = parseInt(this.physics.value);
  var chemistry = parseInt(this.chemistry.value);
  var mathematics = parseInt(this.mathematics.value);
  var english = parseInt(this.english.value);

  if (
    physics < 0 ||
    physics > 100 ||
    chemistry < 0 ||
    chemistry > 100 ||
    mathematics < 0 ||
    mathematics > 100 ||
    english < 0 ||
    english > 100
  ) {
    alert("Marks should be between 0 and 100");
    return;
  }

  var photo = this.photo.files[0];
  var signature = this.signature.files[0];
  var maxFileSize = 20 * 1024 * 1024; // 20MB

  // Validate photo and signature
  if (!photo || !signature) {
    alert("Both photo and signature must be uploaded");
    return;
  }

  if (
    photo.size > maxFileSize ||
    signature.size > maxFileSize ||
    photo.type !== "image/jpeg" ||
    signature.type !== "image/jpeg"
  ) {
    alert("Photo and signature must be JPG files and not exceed 20MB");
    return;
  }

  var formData = new FormData(this);

  var submitButton = document.querySelector('form button[type="submit"]');
  submitButton.disabled = true;
  setTimeout(() => (submitButton.disabled = false), 5000);

  fetch("/users", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.reset();
      alert("Student Data saved  successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "There was an error with the registration or roll number may exist in database "
      );
    });
});
