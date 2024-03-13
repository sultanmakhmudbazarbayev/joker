const controller = {
  save_image: async (req, res, next) => {
    try {

    return res.status(200).json({
        status: "OK",
        filename: req.uploadedFilename,
        url: `/images/${req.uploadedFilename}`
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
        url: `/audios/${req.uploadedFilename}`
    });
    } catch (error) {
      next(error);
    }
  },

  save_video: async (req, res, next) => {
    try {

      console.log('video uploading ' , req.uploadedFilename)

    return res.status(200).json({
        status: "OK",
        filename: req.uploadedFilename,
        url: `/videos/${req.uploadedFilename}`
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
