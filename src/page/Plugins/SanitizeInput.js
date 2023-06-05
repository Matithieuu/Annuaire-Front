export function sanitizeInput(input) {
    // Implement your input sanitization logic here
    // Remove or escape any potentially harmful characters or scripts
  
    // Example: Removing HTML tags using regular expressions
    const sanitizedInput = input.replace(/<[^>]+>/g, '');
  
    return sanitizedInput;
  }
  