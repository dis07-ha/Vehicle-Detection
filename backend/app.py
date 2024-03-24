from flask import Flask, request, jsonify
import cv2
import numpy as np
import os

app = Flask(__name__)


def detect_vehicles(image_path, model_path, config_path):
    # Load the pre-trained SSD MobileNet V3 model
    net = cv2.dnn.readNetFromTensorflow(model_path, config_path)
    image = cv2.imread(image_path)
    blob = cv2.dnn.blobFromImage(image, size=(300, 300), swapRB=True)
    net.setInput(blob)
    detections = net.forward()
    vehicles = []
    confidences = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([image.shape[1], image.shape[0], image.shape[1], image.shape[0]])
            (startX, startY, endX, endY) = box.astype("int")
            vehicles.append((startX, startY, endX, endY))
            confidences.append(float(confidence))
    
    for (startX, startY, endX, endY) in vehicles:
        cv2.rectangle(image, (startX, startY), (endX, endY), (0, 255, 0), 2)
    
    processed_image_path = 'processed_image.jpg'
    cv2.imwrite(processed_image_path, image)
    
    return processed_image_path, len(vehicles)

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected image'}), 400
    
    try:
        image_path = 'uploaded_image.jpg'
        file.save(image_path)
        
        model_path = 'ssd_mobilenet_v3_large_coco.pb'
        config_path = 'ssd_mobilenet_v3_large_coco.pbtxt'
        
        processed_image_path, vehicle_count = detect_vehicles(image_path, model_path, config_path)
        
        return jsonify({
            'processedImage': processed_image_path,
            'vehicleCount': vehicle_count
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
