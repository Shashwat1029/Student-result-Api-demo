document.addEventListener("DOMContentLoaded", function () {
  var data = JSON.parse(sessionStorage.getItem("fetchedData") || "{}");
  if (data && Object.keys(data).length !== 0) {
    // Set photo and signature images
    document.getElementById("userPhoto").src = data.photo;

    document.getElementById("userSignature").src = data.signature;

    // Set text content for student information
    document.getElementById("studentName").textContent = data.name || "N/A";
    document.getElementById("studentRoll").textContent =
      data.rollNumber || "N/A";
    document.getElementById("studentPincode").textContent =
      data.pinCode || "N/A";
    document.getElementById("studentDob").textContent = data.dob
      ? new Date(data.dob).toLocaleDateString()
      : "N/A";
    document.getElementById("studentContact").textContent = data.phone || "N/A";

    // Set text content for scores
    document.getElementById("physicsScore").textContent =
      data.physics !== undefined ? data.physics : "N/A";
    document.getElementById("chemistryScore").textContent =
      data.chemistry !== undefined ? data.chemistry : "N/A";
    document.getElementById("mathematicsScore").textContent =
      data.mathematics !== undefined ? data.mathematics : "N/A";
    document.getElementById("englishScore").textContent =
      data.english !== undefined ? data.english : "N/A";

    sessionStorage.removeItem("fetchedData"); // Clear the session storage
  } else {
    alert("No data to display");
    window.location.href = "fetch.html"; // Redirect back to fetch form
  }
});
