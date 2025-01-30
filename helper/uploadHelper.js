const cloudinary = require('cloudinary').v2;


// Cloudinary upload handler
const uploadToCloudinary = (filePath, fileName) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    return new Promise((resolve, reject) => {
        let resourceType = 'auto';
        let folderPath = 'royalbeekeeper';

        // Determine the folder and resource type based on the file extension
        if (fileName.match(/\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp)$/i)) {
            resourceType = 'image';
            folderPath = 'royalbeekeeper/image';
        } else if (fileName.match(/\.(mp4|mov|avi|wmv|flv|mkv)$/i)) {
            resourceType = 'video';
            folderPath = 'royalbeekeeper/video';
        } else if (fileName.match(/\.(pdf)$/i)) {
            resourceType = 'raw';
            folderPath = 'royalbeekeeper/pdf';
        }

        // Upload the file to Cloudinary
        cloudinary.uploader.upload(filePath, {
            invalidate: true,
            resource_type: resourceType,
            use_filename: true,
            folder: folderPath,
        })
            .then((result) => resolve({ success: true, result }))
            .catch((error) => reject({ success: false, error }));
    });
};

// Cloudinary delete handler
const deleteFromCloudinary = async (imageUrl) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    try {
        // Split the URL to get parts
        const parts = imageUrl.split('/');
        const versionAndFilename = parts.pop(); // e.g., "Logo_RB_dnf6mg.png"

        const publicId = `${parts[parts.length - 2]}/${parts[parts.length - 1]}/${versionAndFilename.split('.')[0]}`;
        const formattedPublicId = publicId.replace(/^\//, ''); // Ensure there's no leading slash

        // Call Cloudinary's delete function
        const result = await cloudinary.uploader.destroy(formattedPublicId);

        // Check if the deletion was successful
        if (result.result === "ok") {
            return { success: true };
        } else {
            console.error("Error: Resource not found for publicId:", formattedPublicId); // Log error for not found
            return { success: false };
        }
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return { success: false };
    }
};


// Export the functions for external use
module.exports = { uploadToCloudinary, deleteFromCloudinary };
