# Vehicle-Detection

Description:
This web application allows users to upload images and detect vehicles using a pre-trained model. It provides a user-friendly interface for uploading images, viewing the original and processed images, and displaying the count of detected vehicles.

Download Pre-trained Model:

Download the pre-trained SSD MobileNet V3 Large model (ssd_mobilenet_v3_large_coco.pb) and its associated configuration file (ssd_mobilenet_v3_large_coco.pbtxt) from the TensorFlow Model Zoo.
Place these files in the models directory of the project

Running the Application:

Start the Flask Server:
Access the Application:

Open a web browser and go to http://localhost:5000 to access the web application.
Testing the Application:

Upload Images:

Click on the "Upload" button to select an image file from your local machine.
Supported image formats include JPEG, PNG, and GIF.
View Detection Results:

Once the image is uploaded, the web application will display both the original and processed images.
The processed image will highlight the detected vehicles and display the count.
Additional Notes:

Ensure that you have the necessary permissions to download and use the pre-trained model files.
Make sure to update the file paths in the Flask application (app.py) if you place the model files in a different directory.
For advanced features or customizations, refer to the Flask and React documentation.
