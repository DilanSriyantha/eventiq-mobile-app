import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

class CloudinaryHelper {
    constructor() { }

    public uploadImage = async (uri: string) => {
        try {
            const cleanUri = uri.startsWith("file://") ? uri : `file://${uri}`;

            // const base64Content = await FileSystem.readAsStringAsync(cleanUri, {
            //     encoding: FileSystem.EncodingType.Base64,
            // });

            const data = new FormData();
            data.append("file", {
                uri: cleanUri,
                type: "image/jpeg",
                name: "upload.jpeg",
            } as any);
            data.append("upload_preset", "default_upload_preset");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dmaiwmf5f/image/upload`,
                {
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const responseData = await response.json();

            console.log(responseData);

            return responseData.secure_url;
        } catch (err) {
            console.error("uploadImage failed:", err);
            throw err;
        }
    };
}

export default CloudinaryHelper;
