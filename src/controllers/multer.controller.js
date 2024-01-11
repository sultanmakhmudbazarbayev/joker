const controller = {
    save: async (req, res, next) => {
    try {

    return res.status(200).json({
        status: "OK",
        filename: req.uploadedFilename
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
