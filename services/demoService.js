const demoDao = require('../dao/demoDao');

const addDemo = async (data) => {
  if (!data.name || !data.url || !data.github || !data.description || !data.thumb || !data.order) {
    throw new Error('All fields are required');
  }
  data.description = JSON.stringify(data.description); // Convert array to string
  return await demoDao.addDemo(data);
};

const getAllDemos = async () => {
  const demos = await demoDao.getAllDemos();
  return demos.map(demo => ({
    ...demo.toJSON(),
    description: JSON.parse(demo.description) // Convert string to array
  }));
};

const updateDemoById = async (id, data) => {
  data.description = JSON.stringify(data.description)
  return await demoDao.updateDemoById(id, data);
};

const deleteDemoById = async (id) => {
  return await demoDao.deleteDemoById(id);
};

module.exports = {
  addDemo,
  getAllDemos,
  updateDemoById,
  deleteDemoById
};
