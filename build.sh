#!/bin/bash
# Build presentation from modular files

cd "$(dirname "$0")"

python3 - << 'EOF'
import os

# Read CSS
with open('css/styles.css', 'r') as f:
    css = f.read()

# Read all slides in order (00-23) - 00 is setup slide
slides_html = ''
for i in range(0, 24):
    slide_file = f'slides/slide-{i:02d}.html'
    with open(slide_file, 'r') as f:
        slide_content = f.read()
        # Fix image paths: ../LOGOS/ -> LOGOS/
        slide_content = slide_content.replace('../LOGOS/', 'LOGOS/')
        slides_html += slide_content + '\n\n'

# Read JS
with open('js/script.js', 'r') as f:
    js = f.read()

# Create complete HTML
html = f'''<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <meta name="theme-color" content="#0f0c08">
    <title>Crypque & Mobicryp - Professional Presentation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
{css}
    </style>
</head>
<body>
    <div class="presentation">
{slides_html}
    </div>

    <div class="nav-controls">
        <button class="nav-btn" onclick="prevSlide()">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="nav-btn" onclick="nextSlide()">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>

    <div class="slide-counter">
        <span id="currentSlide">0</span> / <span id="totalSlides">24</span>
    </div>

    <script>
{js}
    </script>
</body>
</html>'''

# Write complete presentation
with open('presentation.html', 'w') as f:
    f.write(html)

print('✅ presentation.html built successfully!')
EOF
