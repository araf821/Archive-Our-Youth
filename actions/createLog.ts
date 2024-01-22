"use server";

import { ACTION_TYPE, LOG_TYPE } from "@prisma/client";

interface createLogProps {
  userId: string;
  userImg: string;
  userName: string;
  actionType: ACTION_TYPE;
  logType: LOG_TYPE;
}

const createLog = ({
  actionType,
  logType,
  userId,
  userImg,
  userName,
}: createLogProps) => {
  return {
    success: "Log created.",
  };
};

export default createLog;
