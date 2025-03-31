export async function loadModel() {
    const modelURL = "./model.json";
    const metadataURL = "./metadata.json";

    try {
        const model = await tmImage.load(modelURL, metadataURL);
        console.log("Model loaded successfully!");
        return model;
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

async function predict() {
    const model = await loadModel();

    if (!model) {
        document.getElementById("result").innerText = "Model failed to load.";
        return;
    }

    const imageElement = document.getElementById("preview");
    if (!imageElement.src) {
        document.getElementById("result").innerText = "Please upload an image first.";
        return;
    }

    const predictions = await model.predict(imageElement);
    let resultText = "Predictions:\n";
    predictions.forEach(p => {
        resultText += `${p.className}: ${p.probability.toFixed(2)}\n`;
    });

    document.getElementById("result").innerText = resultText;
}

document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Ensure the model loads as soon as the page starts
loadModel();

