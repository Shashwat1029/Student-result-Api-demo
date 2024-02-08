document.getElementById("fetchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var rollNumber = this.rollNumber.value;
  var dob = this.dob.value;

  fetch(`/users/${rollNumber}/${dob}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        sessionStorage.setItem("fetchedData", JSON.stringify(data));
        window.location.href = "displayData.html";
      } else {
        alert("No data found");
      }
    })
    .catch((error) => console.error("Error:", error));
});
