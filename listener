<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voice Recorder with Copy Feature</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
      margin: 20px 10px;
      font-size: 1.8rem;
    }
    .container {
      width: 90%;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    #mic-button {
      cursor: pointer;
      width: 150px;
      height: 150px;
      background-size: cover;
      background-position: center;
      border: none;
      border-radius: 50%;
      background-color: #f0f0f0;
      background-image: url('https://cdn.shopify.com/s/files/1/0674/6747/7282/files/4_67840d70-6c42-465e-95a7-11d01bbc5c03.png?v=1730790629');
      transition: transform 0.1s;
    }
    #mic-button.active {
      transform: scale(0.9);
      background-image: url('https://cdn.shopify.com/s/files/1/0674/6747/7282/files/3_290befee-9dbc-4c8c-83a7-1cfbda29bac0.png?v=1730790629');
    }
    #transcription {
      font-size: 1rem;
      color: #444;
      margin-top: 20px;
      padding: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;
      background: #f0f9ff;
      min-height: 30px;
      box-sizing: border-box;
      text-align: left;
      white-space: pre-wrap;
    }
    .button-row {
      margin-top: 20px;
    }
    .action-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin: 5px;
    }
    .action-button:hover {
      background-color: #0056b3;
    }
    .clear-button {
      background-color: #e63946;
    }
    .clear-button:hover {
      background-color: #c42d3a;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Hold the Button to Record Your Voice</h1>
    <button id="mic-button"></button>
    <div id="transcription">Your speech will appear here...</div>
    <div class="button-row">
      <button class="action-button clear-button" onclick="clearTranscription()">Clear</button>
      <button class="action-button" onclick="copyToClipboard()">Copy</button>
    </div>
  </div>

  <script>
    const micButton = document.getElementById('mic-button');
    const transcription = document.getElementById('transcription');

    let recognition;
    let isRecording = false;
    let fullTranscript = ""; // Variable to hold full transcription text

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.lang = 'ko-KR'; // Change to 'ko-KR' for Korean
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const currentTranscript = event.results[event.results.length - 1][0].transcript;

        if (event.results[event.results.length - 1].isFinal) {
          fullTranscript += " " + currentTranscript;
          transcription.textContent = fullTranscript.trim();
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          recognition.start(); // Restart automatically if still holding the button
        }
      };

      // Add event listeners for both mobile and desktop
      micButton.addEventListener('mousedown', startRecording);
      micButton.addEventListener('mouseup', stopRecording);
      micButton.addEventListener('mouseleave', stopRecording);

      micButton.addEventListener('touchstart', startRecording);
      micButton.addEventListener('touchend', stopRecording);
    } else {
      transcription.textContent = "Speech recognition is not supported in your browser.";
    }

    function startRecording(event) {
      event.preventDefault(); // Prevent scrolling or default behavior on mobile
      isRecording = true;
      micButton.classList.add('active');
      recognition.start();
    }

    function stopRecording(event) {
      event.preventDefault();
      isRecording = false;
      micButton.classList.remove('active');
      recognition.stop();
    }

    function clearTranscription() {
      fullTranscript = ""; // Clear the stored transcript
      transcription.textContent = "Your speech will appear here...";
    }

    function copyToClipboard() {
      const textToCopy = transcription.textContent.trim();
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).catch(err => {
          console.error("Failed to copy: ", err);
        });
      }
    }
  </script>

</body>
</html>
