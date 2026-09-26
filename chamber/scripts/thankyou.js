document.addEventListener("DOMContentLoaded", () => {
    const formData = new URLSearchParams(window.location.search);
    const resultsElement = document.getElementById("results");

    if (resultsElement && formData.toString() !== "") {
        const fname = formData.get("fname") || "N/A";
        const lname = formData.get("lname") || "N/A";
        const email = formData.get("email") || "N/A";
        const phone = formData.get("phone") || "N/A";
        const organization = formData.get("organization") || "N/A";
        const rawTimestamp = formData.get("timestamp") || "";

        let formattedDate = "N/A";
        if (rawTimestamp) {
            const dateObj = new Date(rawTimestamp);
            formattedDate = dateObj.toLocaleString();
        }

        resultsElement.innerHTML = `
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile Phone:</strong> ${phone}</p>
            <p><strong>Business/Organization:</strong> ${organization}</p>
            <p><strong>Submitted Date & Time:</strong> ${formattedDate}</p>
        `;
    } else if (resultsElement) {
        resultsElement.innerHTML = `<p>No submission data detected.</p>`;
    }

    // Pie de página dinámico
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
});