const controller = {
  save_image: async (req, res, next) => {
    try {

    return res.status(200).json({
        status: "OK",
        filename: req.uploadedFilename,
        url: process.env.BASE_URL + `/images/${req.uploadedFilename}`
    });
    } catch (error) {
      next(error);
    }
  },

  save_audio: async (req, res, next) => {
    try {

      console.log('audio uploading ' , req.uploadedFilename)

    return res.status(200).json({
        status: "OK",
        filename: req.uploadedFilename,
        url: process.env.BASE_URL + `/audios/${req.uploadedFilename}`
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
