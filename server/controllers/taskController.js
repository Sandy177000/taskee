import getPrismaInstance from "../prisma/prismaClient.js";

export const addTask = async (req, res) => {
  try {
    const { taskName, taskDetails, rating, status,dueDate } = req.body;

    let prisma = getPrismaInstance();
    let data = await prisma.task.create({
      data: {
        taskName,
        taskDetails,
        rating: parseInt(rating),
        status,
        dueDate
      },
    });
    
    ("New task added!")
    return res.status(200).send(data);
  } catch (error) {
    (error.message);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    let prisma = getPrismaInstance();

    let data = await prisma.task.findMany({
      select: {
        id: true,
        taskName: true,
        taskDetails: true,
        rating: true,
        status: true,
        dueDate: true,
        createdAt: true,
      },
    });
    return res.status(200).send(data);
  } catch (error) {
    (error);
    (error.message);
  }
};

export const getSortedTasks = async (req, res) => {
  try {
    let prisma = getPrismaInstance();

    let data = await prisma.task.findMany({
      orderBy:{
        rating: "desc"
      },
      select: {
        id: true,
        taskName: true,
        taskDetails: true,
        rating: true,
        status: true,
        dueDate:true,
        createdAt: true,
      },
    });
    return res.status(200).send(data);
  } catch (error) {
    (error);
  }
};



export const deleteTask = async (req, res) => {
  try {

    let  {taskId}  = req.body;
    let prisma = getPrismaInstance();
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    
    ("Task Deleted!", taskId)
    return res.status(200).send(taskId);
  } catch (error) {
    (error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId, taskName, taskDetails, rating, status,dueDate } = req.body;

    
    let prisma = getPrismaInstance();
    let data = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        taskName,
        taskDetails,
        rating: parseInt(rating),
        status,
        dueDate
      },
    });

    ("Task is updated", taskId)

    return res.status(200).send(data);
  } catch (error) {
    (error);
  }
};
