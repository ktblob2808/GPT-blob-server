const Demo = require('./models/demoModel');

const addDemo = async (data) => {
  return await Demo.create(data);
};

const getAllDemos = async () => {
  return await Demo.findAll({ order: [['order', 'ASC']] });
};

const updateDemoById = async (id, data) => {
  await Demo.update(data, { where: { id } });
  return await Demo.findByPk(id);
};

const deleteDemoById = async (id) => {
  const demo = await Demo.findByPk(id);
  await Demo.destroy({ where: { id } });
  return demo.order;
};

module.exports = {
  addDemo,
  getAllDemos,
  updateDemoById,
  deleteDemoById
};
