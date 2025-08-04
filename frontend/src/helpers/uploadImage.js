const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`



const uploadImage = async(image) => {
  
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","MERN_e-book")
    



  try {
    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const result = await dataResponse.json();

    if (!dataResponse.ok) {
      throw new Error(result.error?.message || "Upload failed");
    }

    return result;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    return { url: "", error: err.message };
  }
};

export default uploadImage;