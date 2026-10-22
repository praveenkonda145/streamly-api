
import mongoose from "mongoose";
import Video from "../models/video.model.js";

export const createVideo = async (req, res, next) => {
  try {
    const video = await Video.create(req.body);
    return res.status(201).json(video);
  } catch (err) {
    return next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json(video);
  } catch (err) {
    return next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export const topVideos = async (req, res, next) => {
  try {
    const channelObjectId =
      new mongoose.Types.ObjectId(req.params.id);

    const videos = await Video.aggregate([
      {
        $match: {
          channelId: channelObjectId,
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          views: 1,
        },
      },
    ]);

    return res.status(200).json({
      channelId: req.params.id,
      count: videos.length,
      videos,
    });
  } catch (err) {
    return next(err);
  }
};
