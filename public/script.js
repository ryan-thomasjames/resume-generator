document.getElementById('resume-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('/generate-pdf', {
            method: 'POST',
            body: new URLSearchParams(formData) 
        });

        if (response.ok) {
            const blob = await response.blob(); // Fetch the file as a blob
            const url = window.URL.createObjectURL(blob); // Create a URL for the file
            const anchor = document.createElement('a');  // Create an anchor element
            anchor.href = url;                            // Set the URL as the href
            anchor.download = filename;                   // Suggest a filename
            document.body.appendChild(anchor);            // Append to the body temporarily
            anchor.click();                               // Trigger the click event to start download
            document.body.removeChild(anchor);            // Remove the anchor element
            window.URL.revokeObjectURL(url);                          
        } else {
            console.error('Failed to generate PDF.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
