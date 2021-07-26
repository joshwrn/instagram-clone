const resizeImage = (e, setImageFile, setPostFile, width) => {
  const file = e.target.files[0];
  if (file && file.size < 5000000) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const imgEl = document.createElement('img');
      imgEl.src = event.target.result;

      imgEl.onload = function (e) {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = width;
        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpeg');
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
