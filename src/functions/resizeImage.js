const resizeImage = (e, setImageFile, setPostFile, width) => {
  const file = e.target.files[0];
  if (file && file.size < 5000000) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imgEl = document.createElement('img');
      imgEl.src = event.target.result;

      imgEl.onload = (img) => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = width;
        const scaleSize = MAX_WIDTH / img.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.target.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(img.target, 'image/jpeg');
        if (setImageFile !== 'none') {
          setImageFile(srcEncoded);
        }
        ctx.canvas.toBlob(
          (blob) => {
            setPostFile(blob);
          },
          'image/jpeg',
          0.7
        );
      };
    };
  }
};

export default resizeImage;
