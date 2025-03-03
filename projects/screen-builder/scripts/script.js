document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const backgroundColorSelect = document.getElementById('background-color');
    const textInput = document.getElementById('add-text');
    const textColorSelect = document.getElementById('text-color');
    const fontSizeSelect = document.getElementById('font-size');
    const fontFamilySelect = document.getElementById('font-family');
    const imageSelect = document.getElementById('add-image');
    const fileUpload = document.getElementById('file-upload');
    const addTextBtn = document.getElementById('add-text-btn');
    const resetBtn = document.getElementById('reset-btn');
    const designElements = document.getElementById('design-elements');
    const designCanvas = document.querySelector('.design-canvas');
    const placeholderText = document.querySelector('.placeholder-text');

    // Background color change
    backgroundColorSelect.addEventListener('change', function () {
        designCanvas.style.backgroundColor = this.value;
        // Hide placeholder once user starts customizing
        placeholderText.style.display = 'none';
    });

    // Add text element
    addTextBtn.addEventListener('click', function () {
        if (textInput.value.trim() === '') return;

        // Hide placeholder once user adds an element
        placeholderText.style.display = 'none';

        const textColor = textColorSelect.value;
        const fontSize = fontSizeSelect.value;
        const fontFamily = fontFamilySelect.value;

        const textElement = document.createElement('div');
        textElement.className = 'text-element';
        textElement.textContent = textInput.value;
        textElement.style.color = textColor;
        textElement.style.fontSize = `${fontSize}px`;
        textElement.style.fontFamily = fontFamily;

        // Random position within canvas
        const maxLeft = designCanvas.clientWidth - 100;
        const maxTop = designCanvas.clientHeight - 50;
        textElement.style.left = `${Math.random() * maxLeft}px`;
        textElement.style.top = `${Math.random() * maxTop}px`;

        designElements.appendChild(textElement);
        makeElementDraggable(textElement);

        // Clear text input
        textInput.value = '';
    });

    // Add image from selection
    imageSelect.addEventListener('change', function () {
        if (this.value === '') return;

        // Hide placeholder once user adds an element
        placeholderText.style.display = 'none';

        const imageElement = document.createElement('div');
        imageElement.className = 'image-element';

        // Set a colored rectangle as placeholder for the selected image
        const colors = {
            'image1': '#ff6b6b',
            'image2': '#48dbfb',
            'image3': '#1dd1a1'
        };

        imageElement.style.width = '100px';
        imageElement.style.height = '100px';
        imageElement.style.backgroundColor = colors[this.value] || '#cccccc';

        // Random position within canvas
        const maxLeft = designCanvas.clientWidth - 100;
        const maxTop = designCanvas.clientHeight - 100;
        imageElement.style.left = `${Math.random() * maxLeft}px`;
        imageElement.style.top = `${Math.random() * maxTop}px`;

        designElements.appendChild(imageElement);
        makeElementDraggable(imageElement);
    });

    // Upload image
    fileUpload.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Hide placeholder once user adds an element
                placeholderText.style.display = 'none';

                const imageElement = document.createElement('div');
                imageElement.className = 'image-element';

                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';

                imageElement.appendChild(img);

                // Random position within canvas
                const maxLeft = designCanvas.clientWidth - 200;
                const maxTop = designCanvas.clientHeight - 200;
                imageElement.style.left = `${Math.random() * maxLeft}px`;
                imageElement.style.top = `${Math.random() * maxTop}px`;

                designElements.appendChild(imageElement);
                makeElementDraggable(imageElement);
            };

            reader.readAsDataURL(this.files[0]);
        }
    });

    // Reset button
    resetBtn.addEventListener('click', function () {
        // Clear all design elements
        designElements.innerHTML = '';

        // Reset canvas background
        designCanvas.style.backgroundColor = 'white';

        // Reset form elements
        backgroundColorSelect.selectedIndex = 0;
        textInput.value = '';
        textColorSelect.selectedIndex = 0;
        fontSizeSelect.selectedIndex = 1; // Medium
        fontFamilySelect.selectedIndex = 0;
        imageSelect.selectedIndex = 0;
        fileUpload.value = '';

        // Show placeholder text again
        placeholderText.style.display = 'block';
    });

    // Make elements draggable
    function makeElementDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = dragMouseDown;
        element.ontouchstart = dragTouchStart;

        function dragMouseDown(e) {
            e.preventDefault();
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function dragTouchStart(e) {
            e.preventDefault();
            // Get the touch position at startup
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementTouchDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function elementTouchDrag(e) {
            e.preventDefault();
            // Calculate the new touch position
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Stop moving when mouse/touch is released
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }

    // Prevent text field from submitting the form on Enter key
    textInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTextBtn.click();
        }
    });
});