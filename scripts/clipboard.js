// Copy to clipboard functionality
function copyToClipboard(element) {
    const text = element.textContent.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        // Show copied notification
        const notice = element.querySelector('.copy-notice') || element;
        const originalText = notice.textContent;
        notice.textContent = 'Copied!';
        notice.style.display = 'block';
        
        setTimeout(() => {
            notice.textContent = originalText;
            if (notice.classList.contains('copy-notice')) {
                notice.style.display = 'none';
            }
        }, 2000);
        
        showToast('Copied to clipboard', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Copy failed', 'error');
    });
}

// Initialize copy buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.code-display').forEach(element => {
        element.addEventListener('click', function() {
            copyToClipboard(this);
        });
    });
});
