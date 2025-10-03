import * as FileSystem from "expo-file-system";

class FirebaseStorageHelper {

    constructor() { }

    public async uploadFile(localUri: string) {
        try {
            const filename = localUri.substring(localUri.lastIndexOf("/") + 1);

            const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/eventiq-mobile-app.firebasestorage.app/o?name=${filename}`;

            const response = await FileSystem.uploadAsync(uploadUrl, localUri, {
                fieldName: "file",
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                headers: {
                    "Content-Type": "image/jpeg",
                },
            });

            if (response) return `https://firebasestorage.googleapis.com/v0/b/eventiq-mobile-app.firebasestorage.app/o/${filename}?alt=media`;

            throw new Error("Error occurred while uploading file.");
        } catch (err) {
            throw err;
        }
    }
}

export default FirebaseStorageHelper;